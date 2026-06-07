import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fromRoot = (...parts) => path.join(root, ...parts);
const requiredFiles = [
    "AGENTS.md",
    "now.config.json",
    "package.json",
    "docs/harness/state.md",
    "docs/harness/backlog.json",
    "docs/harness/story-workflow.md",
    "docs/harness/session-handoff.md",
    "docs/harness/verification.md",
    "scripts/harness-validate.mjs",
];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(fromRoot(...file.split("/"))));

if (missingFiles.length > 0) {
    throw new Error(`Harness initialization failed. Missing: ${missingFiles.join(", ")}`);
}

const commandOutput = (command, args) =>
    execFileSync(command, args, { cwd: root, encoding: "utf8" }).trim();
const npmVersion =
    process.env.npm_config_user_agent?.match(/\bnpm\/([^\s]+)/)?.[1] ?? "unknown";

console.log(`Repository: ${root}`);
console.log(`Branch: ${commandOutput("git", ["branch", "--show-current"])}`);
console.log(`Node: ${process.version}`);
console.log(`npm: ${npmVersion}`);
console.log("");

await import("./harness-validate.mjs");

console.log("");
console.log("Working tree:");
console.log(commandOutput("git", ["status", "--short"]) || "clean");

if (process.argv.includes("--build")) {
    if (!fs.existsSync(fromRoot("node_modules"))) {
        throw new Error("Cannot build: node_modules is missing. Dependency installation requires explicit user approval.");
    }

    if (!process.env.npm_execpath) {
        throw new Error("Build mode must be run through 'npm run harness:init:build'.");
    }

    const result = spawnSync(process.execPath, [process.env.npm_execpath, "run", "build"], {
        cwd: root,
        stdio: "inherit",
    });
    process.exitCode = result.status ?? 1;
}
