import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temp = mkdtempSync(path.join(tmpdir(), "now-sdk-mock-smoke-"));
const packageName = "@kobidev/now-sdk-mock";

try {
  const packOutput = execFileSync(process.execPath, [process.env.npm_execpath, "pack", "--json", "--pack-destination", temp], { cwd: root, encoding: "utf8" });
  const [{ filename, files }] = JSON.parse(packOutput);
  assert(files.some((file) => file.path === "dist/index.js"));
  assert(!files.some((file) => file.path.startsWith("references/") || file.path.startsWith("repos/")));
  assert(!files.some((file) => file.path.endsWith(".bak")));
  assert(!files.some((file) => file.path.endsWith(".map")));

  const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(packageJson.type, "module");
  assert.equal(packageJson.exports["."].require, undefined);
  assert.equal(packageJson.exports["."].default, undefined);
  const commonJsLoad = createRequire(import.meta.url);
  assert.equal(packageJson.name, packageName);
  assert.equal(packageJson.publishConfig.access, "public");
  assert.throws(() => commonJsLoad(packageName), (error) => error?.code === "ERR_PACKAGE_PATH_NOT_EXPORTED");

  const module = await import(pathToFileURL(path.join(root, "dist", "index.js")).href);
  assert.equal(typeof module.MockGlideQuery, "function");
  assert.equal(typeof module.MockOptional, "function");
  assert.equal(typeof module.MockStream, "function");
  assert.equal(typeof module.resetMockState, "function");
} finally {
  rmSync(temp, { recursive: true, force: true });
}

console.log("Package smoke verification passed.");
