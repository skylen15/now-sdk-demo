import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "AGENTS.md",
  "package.json",
  "docs/harness/state.md",
  "docs/harness/backlog.json",
  "docs/harness/story-workflow.md",
  "docs/harness/session-handoff.md",
  "docs/harness/verification.md",
  "scripts/harness-validate.mjs",
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, ...file.split("/"))));
if (missing.length > 0) throw new Error(`Harness initialization failed. Missing: ${missing.join(", ")}`);

const command = (name, args) => execFileSync(name, args, { cwd: root, encoding: "utf8" }).trim();
console.log(`Repository: ${root}`);
console.log(`Branch: ${command("git", ["branch", "--show-current"])}`);
console.log(`Node: ${process.version}\n`);
await import("./harness-validate.mjs");
console.log(`\nWorking tree:\n${command("git", ["status", "--short"]) || "clean"}`);

if (process.argv.includes("--build")) {
  if (!fs.existsSync(path.join(root, "node_modules"))) {
    throw new Error("Cannot build: node_modules is missing. Dependency installation requires explicit approval.");
  }
  if (!process.env.npm_execpath) throw new Error("Build mode must be run through the package script.");
  const result = spawnSync(process.execPath, [process.env.npm_execpath, "run", "build"], { cwd: root, stdio: "inherit" });
  process.exitCode = result.status ?? 1;
}
