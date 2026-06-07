import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith("--"));
const targetRoot = path.resolve(targetArg ?? ".");
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const agentsMarker = "<!-- spec-harness:start -->";

const portableFiles = [
    "docs/harness/story-workflow.md",
    "docs/harness/verification.md",
    "docs/harness/rules/fluent-source-of-truth.md",
    "docs/harness/rules/security.md",
    "docs/harness/rules/servicenow-now-sdk.md",
    "docs/harness/rules/testing.md",
    "docs/harness/rules/ui.md",
    "docs/harness/skills/README.md",
    "docs/harness/skills/context7/SKILL.md",
    "docs/harness/skills/docs-review/SKILL.md",
    "docs/harness/skills/platform-review/SKILL.md",
    "docs/harness/skills/security-review/SKILL.md",
    "docs/harness/skills/sn-docs/SKILL.md",
    "docs/harness/skills/test-review/SKILL.md",
    "docs/harness/skills/ui-review/SKILL.md",
    "scripts/harness-init.mjs",
    "scripts/harness-validate.mjs",
];

const generatedFiles = new Map([
    ["docs/harness/README.md", `# Spec Harness

This harness keeps implementation, review, backlog state, and verification evidence consistent.

## Use

1. Run \`npm run harness:init\` at the start of a session.
2. Read \`state.md\`, \`session-handoff.md\`, and the active story.
3. Follow \`story-workflow.md\` and the relevant rules and skills.
4. Record verification evidence before declaring work complete.
`],
    ["docs/harness/state.md", `# Harness State

## Current Story
US001 - Project Foundation

## Current Phase
Planned

## Durable Status

- Harness installed.
- Replace this starter story with the project's real backlog.

## Next Action

Define the project foundation acceptance criteria and begin US001.
`],
    ["docs/harness/session-handoff.md", `# Session Handoff

## Session Goal

Define and begin the first project story.

## Completed This Session

- Installed the spec harness.

## Verification Evidence

- Run \`npm run harness:init\`.

## Remaining Work

- Replace starter project details and acceptance criteria.

## Known Blockers

- None recorded.

## Next Command

\`\`\`sh
npm run harness:init
\`\`\`
`],
    ["docs/harness/decisions.md", `# Architecture Decisions

Record durable project and architecture decisions here.
`],
    ["docs/harness/quality-score.md", `# Quality Score

Record evidence-based quality trends and gaps here.
`],
    ["docs/harness/tech-debt.md", `# Technical Debt

Record actionable cross-story engineering debt here.
`],
    ["docs/harness/backlog.json", `${JSON.stringify({
        generatedAt: new Date().toISOString(),
        source: "local starter backlog",
        stories: [{
            id: "US001",
            title: "Project Foundation",
            state: "Planned",
            normalizedState: "active",
            sourcePath: "docs/stories/US001-project-foundation.md",
        }],
    }, null, 2)}\n`],
    ["docs/stories/US001-project-foundation.md", `# US001 - Project Foundation

## Summary

Establish the project's initial implementation and verification baseline.

## Acceptance Criteria

- The project-specific foundation requirements are documented.
- Required local validation passes.

## Testing

- Run \`npm run harness:init\`.
- Run the project's build or equivalent validation when feasible.
`],
]);

const actions = [];
const conflicts = [];

function writeFile(relativePath, content) {
    const destination = path.join(targetRoot, ...relativePath.split("/"));
    if (fs.existsSync(destination) && !force) {
        conflicts.push(relativePath);
        return;
    }
    actions.push(`${fs.existsSync(destination) ? "overwrite" : "create"} ${relativePath}`);
    if (!dryRun) {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, content);
    }
}

if (!fs.existsSync(targetRoot)) {
    throw new Error(`Target directory does not exist: ${targetRoot}`);
}

for (const relativePath of portableFiles) {
    const source = path.join(sourceRoot, ...relativePath.split("/"));
    writeFile(relativePath, fs.readFileSync(source));
}

for (const [relativePath, content] of generatedFiles) {
    writeFile(relativePath, content);
}

const packagePath = path.join(targetRoot, "package.json");
if (!fs.existsSync(packagePath)) {
    throw new Error(`Target must contain package.json: ${packagePath}`);
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
packageJson.scripts ??= {};
const harnessScripts = {
    "harness:init": "node scripts/harness-init.mjs",
    "harness:validate": "node scripts/harness-validate.mjs",
    "harness:init:build": "node scripts/harness-init.mjs --build",
};

for (const [name, command] of Object.entries(harnessScripts)) {
    if (packageJson.scripts[name] && packageJson.scripts[name] !== command && !force) {
        conflicts.push(`package.json scripts.${name}`);
    } else if (packageJson.scripts[name] !== command) {
        packageJson.scripts[name] = command;
        actions.push(`merge package.json scripts.${name}`);
    }
}

if (!dryRun && !conflicts.some((item) => item.startsWith("package.json scripts."))) {
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 4)}\n`);
}

const agentsPath = path.join(targetRoot, "AGENTS.md");
const agentsBlock = `
${agentsMarker}
## Spec Harness

- Run \`npm run harness:init\` before story work.
- Follow \`docs/harness/story-workflow.md\` when executing a task or story.
- Read and update \`docs/harness/session-handoff.md\` so unfinished work can resume safely.
- Follow \`docs/harness/verification.md\`; do not declare completion without recorded evidence.
- Apply relevant rules and review skills under \`docs/harness/\`.
<!-- spec-harness:end -->
`;
const agentsText = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, "utf8") : "# Agent Guide\n";
if (!agentsText.includes(agentsMarker)) {
    actions.push(`${fs.existsSync(agentsPath) ? "merge" : "create"} AGENTS.md harness instructions`);
    if (!dryRun) fs.writeFileSync(agentsPath, `${agentsText.trimEnd()}\n${agentsBlock}`);
}

console.log(`${dryRun ? "Dry run for" : "Applied harness to"}: ${targetRoot}`);
for (const action of actions) console.log(`  ${action}`);

if (conflicts.length > 0) {
    console.error("\nSkipped existing/conflicting entries:");
    for (const conflict of conflicts) console.error(`  ${conflict}`);
    console.error("\nRe-run with --force to overwrite them.");
    process.exitCode = 2;
}
