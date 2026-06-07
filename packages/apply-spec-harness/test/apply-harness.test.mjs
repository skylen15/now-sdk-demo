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
  assert.deepEqual(args.slice(0, 2), ["clone", "--branch"]);
  assert.equal(args[3], "--single-branch");
  fs.mkdirSync(args[5], { recursive: true });
  fs.writeFileSync(path.join(args[5], "clone.txt"), `${args[4]}#${args[2]}\n`);
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
  assert.equal(options.presetProvided, true);
});

test("marks the default generic preset as implicit", () => {
  const options = parseArguments(["."]);
  assert.equal(options.preset, "generic");
  assert.equal(options.presetProvided, false);
  assert.equal(options.includeTanstackRouter, true);
  assert.equal(options.tanstackRouterProvided, false);
  assert.equal(options.includeTanstackQuery, true);
  assert.equal(options.tanstackQueryProvided, false);
});

test("parses separate options to skip TanStack reference repositories", () => {
  const routerOptions = parseArguments([".", "--preset", "servicenow-now-sdk", "--without-tanstack-router"]);
  assert.equal(routerOptions.includeTanstackRouter, false);
  assert.equal(routerOptions.tanstackRouterProvided, true);
  assert.equal(routerOptions.includeTanstackQuery, true);

  const queryOptions = parseArguments([".", "--preset", "servicenow-now-sdk", "--without-tanstack-query"]);
  assert.equal(queryOptions.includeTanstackQuery, false);
  assert.equal(queryOptions.tanstackQueryProvided, true);
  assert.equal(queryOptions.includeTanstackRouter, true);
});

test("ServiceNow preset adds its rules and repeated application preserves files", () => {
  const target = fixture();
  applyHarness({ target, preset: "servicenow-now-sdk", dryRun: false, force: false, gitRunner: successfulGitClone });
  const second = applyHarness({ target, preset: "servicenow-now-sdk", dryRun: false, force: false, gitRunner: successfulGitClone });
  assert.ok(fs.existsSync(path.join(target, "docs", "harness", "rules", "servicenow-now-sdk.md")));
  assert.ok(fs.existsSync(path.join(target, "repos", "servicenow-docs", "clone.txt")));
  assert.ok(fs.existsSync(path.join(target, "repos", "now-sdk-mock", "clone.txt")));
  assert.ok(fs.existsSync(path.join(target, "repos", "playwright", "clone.txt")));
  assert.ok(fs.existsSync(path.join(target, "repos", "tanstack-router", "clone.txt")));
  assert.ok(fs.existsSync(path.join(target, "repos", "tanstack-query", "clone.txt")));
  assert.ok(second.conflicts.includes("repos/servicenow-docs"));
  assert.ok(second.conflicts.includes("repos/now-sdk-mock"));
  assert.ok(second.conflicts.includes("repos/playwright"));
  assert.ok(second.conflicts.includes("repos/tanstack-router"));
  assert.ok(second.conflicts.includes("repos/tanstack-query"));
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
  assert.ok(result.actions.includes(
    "clone https://github.com/skylen15/now-sdk-mock.git#main repos/now-sdk-mock",
  ));
  assert.ok(result.actions.includes(
    "clone https://github.com/microsoft/playwright.git#main repos/playwright",
  ));
  assert.ok(result.actions.includes(
    "clone https://github.com/TanStack/router.git#main repos/tanstack-router",
  ));
  assert.ok(result.actions.includes(
    "clone https://github.com/TanStack/query.git#main repos/tanstack-query",
  ));
});

test("ServiceNow preset clones the selected release", () => {
  const target = fixture();
  const gitRunner = (_command, args) => {
    if (args[4] === "https://github.com/ServiceNow/ServiceNowDocs.git") {
      assert.equal(args[2], "yokohama");
    } else {
      assert.equal(args[2], "main");
    }
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

test("ServiceNow preset can skip TanStack Router independently", () => {
  const target = fixture();
  const result = applyHarness({
    target,
    preset: "servicenow-now-sdk",
    includeTanstackRouter: false,
    dryRun: true,
    force: false,
  });
  assert.ok(!result.actions.some((action) => action.includes("repos/tanstack-router")));
  assert.ok(result.actions.some((action) => action.includes("repos/tanstack-query")));
});

test("ServiceNow preset can skip TanStack Query independently", () => {
  const target = fixture();
  const result = applyHarness({
    target,
    preset: "servicenow-now-sdk",
    includeTanstackQuery: false,
    dryRun: true,
    force: false,
  });
  assert.ok(result.actions.some((action) => action.includes("repos/tanstack-router")));
  assert.ok(!result.actions.some((action) => action.includes("repos/tanstack-query")));
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
