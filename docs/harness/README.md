# Personal Todo Spec Harness

This harness keeps planning, review, and backlog state consistent for the Personal Todo Now SDK app.

ServiceNow Agile is the backlog source of truth. The local `backlog.json` file is a mirror generated from `rm_story` records on the `pdi-qkb-o2` instance.

## Use

1. Read `state.md` to find the active story and current phase.
2. Run `npm run harness:init` at the start of a session.
3. Read `session-handoff.md` to resume unfinished work.
4. Read `backlog.json` for ServiceNow story IDs and status.
5. Follow `story-workflow.md` for story intake, skill-based review, implementation, validation, and documentation.
6. Apply all relevant skill packages from `skills/` before editing code.
7. Apply all relevant rules from `rules/`.
8. Follow `verification.md` before declaring work complete.
9. Record durable architecture decisions in `decisions.md`.
10. Track evidence-based quality trends in `quality-score.md`.
11. Track actionable cross-story engineering debt in `tech-debt.md`.
12. Follow `release-workflow.md` for biweekly release branches, environment
    promotion, ServiceNow Change Requests, rollback, and post-deploy validation.

## Apply To Another Project

Preview a dependency-free harness installation into another Node.js project:

```sh
npm run harness:apply -- ../another-project --dry-run
```

Apply it:

```sh
npm run harness:apply -- ../another-project
```

The installer copies portable harness rules, skills, workflow, verification, and
lifecycle scripts. It generates a valid starter backlog and story, merges the
required npm scripts, and skips existing files by default. Use `--force` only
when intentionally replacing an existing harness.

`npm run harness:validate` enforces one active normalized story, state/backlog
alignment, unique story IDs, existing source paths, and required acceptance and
testing sections.

The harness lifecycle scripts are dependency-free Node.js modules and use the
same npm commands on Windows, macOS, and Linux.

## Skills

Specialized review guidance lives in portable base-spec skill packages under `docs/harness/skills/<skill-name>/SKILL.md`. The coding agent evaluates the relevant skills inline during implementation. Subagents are optional isolated workers for parallel, noisy, or permission-scoped execution; they should use these skills rather than duplicate them.

- [platform-review/SKILL.md](skills/platform-review/SKILL.md): ServiceNow platform and Now SDK rules.
- [security-review/SKILL.md](skills/security-review/SKILL.md): Access control and data isolation rules.
- [ui-review/SKILL.md](skills/ui-review/SKILL.md): React UI and UX patterns.
- [test-review/SKILL.md](skills/test-review/SKILL.md): Acceptance criteria validation.
- [docs-review/SKILL.md](skills/docs-review/SKILL.md): Planning and state documentation updates.
- [context7/SKILL.md](skills/context7/SKILL.md): Procedure for external library documentation lookups.
- [sn-docs/SKILL.md](skills/sn-docs/SKILL.md): Procedure for ServiceNow/SDK documentation lookups.

## Source of Truth

- Backlog state: ServiceNow Agile `rm_story`
- Backlog mirror: `docs/harness/backlog.json` (`state` preserves the raw ServiceNow value; `normalizedState` drives local harness workflow)
- Current durable state: `docs/harness/state.md`
- Session continuity: `docs/harness/session-handoff.md`
- Completion evidence contract: `docs/harness/verification.md`
- Release and deployment protocol: `docs/harness/release-workflow.md`
- Release evidence: `docs/releases/vX.Y.Z.md` created from
  `docs/harness/release-record-template.md`
- Architecture and system boundaries: `ARCHITECTURE.md`
- Quality trends and known gaps: `docs/harness/quality-score.md`
- Cross-story technical debt: `docs/harness/tech-debt.md`
- Product requirements: `docs/servicenow-personal-todo-prd.md`
- Story detail: `docs/stories/*.md`
- App implementation: `src/`
