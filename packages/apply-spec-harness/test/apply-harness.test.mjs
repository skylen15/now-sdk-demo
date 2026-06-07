import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { applyHarness, parseArguments } from "../lib/apply-harness.mjs";

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "apply-spec-harness-"));
  fs.writeFileSync(path.join(root, "package.json"), '{"name":"fixture","scripts":{"test":"node --test"}}\n');
  return root;
}

function successfulGitClone(command, args) {
  assert.equal(command, "git");
  assert.deepEqual(args.slice(0, 5), [
    "clone",
    "--branch",
    "zurich",
    "--single-branch",
    "https://github.com/ServiceNow/ServiceNowDocs.git",
  ]);
  fs.mkdirSync(args[5], { recursive: true });
  fs.writeFileSync(path.join(args[5], "llms.txt"), "ServiceNow docs\n");
  return { status: 0, stderr: "" };
}

test("applies the generic harness and preserves existing package scripts", () => {
  const target = fixture();
  const result = applyHarness({ target, preset: "generic", dryRun: false, force: false });
  const packageJson = JSON.parse(fs.readFileSync(path.join(target, "package.json"), "utf8"));
  assert.equal(result.conflicts.length, 0);
  assert.equal(packageJson.scripts.test, "node --test");
  assert.equal(packageJson.scripts["harness:init"], "node scripts/harness-init.mjs");
  assert.ok(fs.existsSync(path.join(target, "docs", "harness", "state.md")));
  assert.ok(!fs.existsSync(path.join(target, "docs", "harness", "rules", "servicenow-now-sdk.md")));
});

test("parses an explicit ServiceNow release without treating it as the target", () => {
  const options = parseArguments([".", "--preset", "servicenow-now-sdk", "--servicenow-release", "yokohama"]);
  assert.equal(options.target, ".");
  assert.equal(options.serviceNowRelease, "yokohama");
});

test("ServiceNow preset adds its rules and repeated application preserves files", () => {
  const target = fixture();
  applyHarness({ target, preset: "servicenow-now-sdk", dryRun: false, force: false, gitRunner: successfulGitClone });
  const second = applyHarness({ target, preset: "servicenow-now-sdk", dryRun: false, force: false, gitRunner: successfulGitClone });
  assert.ok(fs.existsSync(path.join(target, "docs", "harness", "rules", "servicenow-now-sdk.md")));
  assert.ok(fs.existsSync(path.join(target, "repos", "servicenow-docs", "llms.txt")));
  assert.ok(second.conflicts.includes("repos/servicenow-docs"));
  assert.ok(second.conflicts.length > 0);
});

test("ServiceNow dry run reports docs clone without invoking git", () => {
  const target = fixture();
  const result = applyHarness({
    target,
    preset: "servicenow-now-sdk",
    dryRun: true,
    force: false,
    gitRunner: () => assert.fail("git must not run during dry run"),
  });
  assert.ok(result.actions.includes(
    "clone https://github.com/ServiceNow/ServiceNowDocs.git#zurich repos/servicenow-docs",
  ));
});

test("ServiceNow preset clones the selected release", () => {
  const target = fixture();
  const gitRunner = (_command, args) => {
    assert.equal(args[2], "yokohama");
    fs.mkdirSync(args[5], { recursive: true });
    return { status: 0, stderr: "" };
  };
  applyHarness({
    target,
    preset: "servicenow-now-sdk",
    serviceNowRelease: "Yokohama",
    dryRun: false,
    force: false,
    gitRunner,
  });
});

test("failed ServiceNow docs clone removes its partial checkout", () => {
  const target = fixture();
  const failingGitClone = (_command, args) => {
    fs.mkdirSync(args[5], { recursive: true });
    fs.writeFileSync(path.join(args[5], "partial"), "incomplete\n");
    return { status: 1, stderr: "network unavailable" };
  };
  assert.throws(
    () => applyHarness({
      target,
      preset: "servicenow-now-sdk",
      dryRun: false,
      force: false,
      gitRunner: failingGitClone,
    }),
    /Unable to clone ServiceNow docs: network unavailable/,
  );
  assert.ok(!fs.existsSync(path.join(target, "repos", "servicenow-docs")));
});

test("dry run does not write files", () => {
  const target = fixture();
  applyHarness({ target, preset: "generic", dryRun: true, force: false });
  assert.ok(!fs.existsSync(path.join(target, "docs")));
});
