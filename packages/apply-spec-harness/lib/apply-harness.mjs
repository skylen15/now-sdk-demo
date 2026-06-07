import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validPresets = new Set(["generic", "servicenow-now-sdk"]);
const agentsMarker = "<!-- spec-harness:start -->";
const serviceNowDocsRepository = "https://github.com/ServiceNow/ServiceNowDocs.git";

export function parseArguments(args) {
  const valueAfter = (name) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : undefined;
  };
  const valueOptions = new Set(["--preset", "--servicenow-release"]);
  const positional = args.find((arg, index) => !arg.startsWith("-") && !valueOptions.has(args[index - 1]));
  const preset = valueAfter("--preset") ?? "generic";
  if (!validPresets.has(preset)) throw new Error(`Unknown preset '${preset}'. Use generic or servicenow-now-sdk.`);
  return {
    target: positional ?? ".",
    preset,
    serviceNowRelease: valueAfter("--servicenow-release"),
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
    help: args.includes("--help") || args.includes("-h"),
  };
}

export function printHelp() {
  console.log(`Usage: apply-spec-harness [target] [options]

Options:
  --preset generic|servicenow-now-sdk  Template preset (default: generic)
  --servicenow-release <release>       ServiceNow docs branch (default: zurich)
  --dry-run                            Preview changes
  --force                              Replace conflicting harness files
  -h, --help                           Show help`);
}

function listFiles(root, current = root) {
  return fs.readdirSync(current, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(current, entry.name);
    return entry.isDirectory() ? listFiles(root, absolute) : [path.relative(root, absolute)];
  });
}

export function applyHarness(options) {
  const target = path.resolve(options.target);
  const packagePath = path.join(target, "package.json");
  if (!fs.existsSync(packagePath)) throw new Error(`Target must contain package.json: ${packagePath}`);

  const actions = [];
  const conflicts = [];
  const applyTemplate = (templateRoot) => {
    for (const relative of listFiles(templateRoot)) {
      const destination = path.join(target, relative);
      if (fs.existsSync(destination) && !options.force) {
        conflicts.push(relative.replaceAll("\\", "/"));
        continue;
      }
      actions.push(`${fs.existsSync(destination) ? "overwrite" : "create"} ${relative.replaceAll("\\", "/")}`);
      if (!options.dryRun) {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.copyFileSync(path.join(templateRoot, relative), destination);
      }
    }
  };

  applyTemplate(path.join(packageRoot, "templates", "core"));
  if (options.preset !== "generic") applyTemplate(path.join(packageRoot, "templates", "presets", options.preset));

  if (options.preset === "servicenow-now-sdk") {
    const serviceNowRelease = options.serviceNowRelease?.trim().toLowerCase() || "zurich";
    const docsPath = path.join(target, "repos", "servicenow-docs");
    const relativeDocsPath = "repos/servicenow-docs";
    if (fs.existsSync(docsPath)) {
      conflicts.push(relativeDocsPath);
    } else {
      actions.push(`clone ${serviceNowDocsRepository}#${serviceNowRelease} ${relativeDocsPath}`);
      if (!options.dryRun) {
        fs.mkdirSync(path.dirname(docsPath), { recursive: true });
        const gitRunner = options.gitRunner ?? spawnSync;
        const result = gitRunner("git", [
          "clone",
          "--branch",
          serviceNowRelease,
          "--single-branch",
          serviceNowDocsRepository,
          docsPath,
        ], { encoding: "utf8" });
        if (result.status !== 0) {
          fs.rmSync(docsPath, { recursive: true, force: true });
          throw new Error(`Unable to clone ServiceNow docs: ${result.stderr?.trim() || "git clone failed"}`);
        }
      }
    }
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  packageJson.scripts ??= {};
  for (const [name, command] of Object.entries({
    "harness:init": "node scripts/harness-init.mjs",
    "harness:validate": "node scripts/harness-validate.mjs",
    "harness:init:build": "node scripts/harness-init.mjs --build",
  })) {
    if (packageJson.scripts[name] && packageJson.scripts[name] !== command && !options.force) {
      conflicts.push(`package.json scripts.${name}`);
    } else if (packageJson.scripts[name] !== command) {
      packageJson.scripts[name] = command;
      actions.push(`merge package.json scripts.${name}`);
    }
  }
  if (!options.dryRun && !conflicts.some((item) => item.startsWith("package.json scripts."))) {
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  const agentsPath = path.join(target, "AGENTS.md");
  const agentsText = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, "utf8") : "# Agent Guide\n";
  if (!agentsText.includes(agentsMarker)) {
    actions.push(`${fs.existsSync(agentsPath) ? "merge" : "create"} AGENTS.md harness instructions`);
    if (!options.dryRun) fs.writeFileSync(agentsPath, `${agentsText.trimEnd()}\n\n${agentsMarker}
## Spec Harness

- Run \`npm run harness:init\` before story work.
- Follow \`docs/harness/story-workflow.md\` and \`docs/harness/verification.md\`.
- Read and update \`docs/harness/session-handoff.md\`.
<!-- spec-harness:end -->
`);
  }

  return { target, actions, conflicts };
}
