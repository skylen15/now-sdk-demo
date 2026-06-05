# Personal Todo Spec Harness

This harness keeps planning, review, and backlog state consistent for the Personal Todo Now SDK app.

ServiceNow Agile is the backlog source of truth. The local `backlog.json` file is a mirror generated from `rm_story` records on the `pdi-qkb-o2` instance.

## Use

1. Read `state.md` to find the active story and current phase.
2. Read `backlog.json` for ServiceNow story IDs and status.
3. Follow `story-workflow.md` for story intake, skill-based review, implementation, validation, and documentation.
4. Apply all relevant skill packages from `skills/` before editing code.
5. Apply all relevant rules from `rules/`.
6. Record durable architecture decisions in `decisions.md`.

## Skills

Specialized review guidance lives in portable base-spec skill packages under `docs/harness/skills/<skill-name>/SKILL.md`. The coding agent evaluates the relevant skills inline during implementation. Subagents are optional isolated workers for parallel, noisy, or permission-scoped execution; they should use these skills rather than duplicate them.

- [platform-review/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/platform-review/SKILL.md): ServiceNow platform and Now SDK rules.
- [security-review/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/security-review/SKILL.md): Access control and data isolation rules.
- [ui-review/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/ui-review/SKILL.md): React UI and UX patterns.
- [test-review/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/test-review/SKILL.md): Acceptance criteria validation.
- [docs-review/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/docs-review/SKILL.md): Planning and state documentation updates.
- [context7/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/context7/SKILL.md): Procedure for external library documentation lookups.
- [sn-docs/SKILL.md](file:///D:/coding/sn/demo/docs/harness/skills/sn-docs/SKILL.md): Procedure for ServiceNow/SDK documentation lookups.

## Source of Truth

- Backlog state: ServiceNow Agile `rm_story`
- Backlog mirror: `docs/harness/backlog.json`
- Product requirements: `docs/servicenow-personal-todo-prd.md`
- Story detail: `docs/stories/*.md`
- App implementation: `src/`
