# Story Workflow

## 1. Intake

- Read `AGENTS.md`, `state.md`, `backlog.json`, the active `docs/stories/*.md` file, and relevant harness rules.
- Confirm ServiceNow story status from `rm_story` when instance work is in scope.

## 2. Skill-Based Review

- Review the active story requirements against relevant skill packages under `docs/harness/skills/<skill-name>/SKILL.md`:
  - `platform-review/SKILL.md` (Required for metadata or server/Fluent changes)
  - `security-review/SKILL.md` (Required for metadata or server/Fluent changes)
  - `ui-review/SKILL.md` (Required for React/client changes)
  - `test-review/SKILL.md` (Required for every story)
  - `docs-review/SKILL.md` (Required when story files, harness state, decisions, or acceptance criteria alignment are involved)
- For each relevant skill, the agent must check whether the ServiceNow platform, Now SDK, or approved project dependency already provides the needed feature or implementation pattern before proposing custom code or new metadata.
- Compile findings into a consolidated checklist before implementing.
- Use subagents only when isolated context, parallel execution, tool scoping, or noisy long-running output is needed. Subagents should preload or follow the same relevant skill packages instead of carrying duplicated review instructions.

## 3. Consolidation

- Address any conflict between story requirements and platform rules, preferring `AGENTS.md`, then harness rules, then story notes.
- Document durable architecture choices in `decisions.md`.

## 4. Implementation

- Implement only after the skill review checklist has been consolidated.
- Edit source-controlled app files only.
- Keep ServiceNow app implementation represented in the repo where supported.
- Do not mutate `references/` or `repos/`.

## 5. Validation

- Run `npm run build` when feasible.
- Run or document ATF, REST, server, or UI smoke coverage required by the story.
- Re-evaluate relevant skill packages against the changed files/diff before declaring the story complete.

## 6. Documentation and Sync

- Update `state.md` and `decisions.md`.
- Sync ServiceNow Agile status when requested.
- Regenerate `backlog.json` from ServiceNow after backlog changes.
- Report which skills were used, what was found/checked, what changed, and what validation passed.
