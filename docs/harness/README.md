# Personal Todo Spec Harness

This harness keeps planning, review, and backlog state consistent for the Personal Todo Now SDK app.

ServiceNow Agile is the backlog source of truth. The local `backlog.json` file is a mirror generated from `rm_story` records on the `pdi-qkb-o2` instance.

## Use

1. Read `state.md` to find the active story and current phase.
2. Read `backlog.json` for ServiceNow story IDs and status.
3. Follow `story-workflow.md` for story intake, skill-based review, implementation, validation, and documentation.
4. Apply all relevant skill checklists from `skills/` before editing code.
5. Apply all relevant rules from `rules/`.
6. Record durable architecture decisions in `decisions.md`.

## Skills

Specialized skill checklists live under `docs/harness/skills/` and are evaluated inline by the coding agent during implementation:

- [platform-review.md](file:///D:/coding/sn/demo/docs/harness/skills/platform-review.md): ServiceNow platform and Now SDK rules.
- [security-review.md](file:///D:/coding/sn/demo/docs/harness/skills/security-review.md): Access control and data isolation rules.
- [ui-review.md](file:///D:/coding/sn/demo/docs/harness/skills/ui-review.md): React UI and UX patterns.
- [test-review.md](file:///D:/coding/sn/demo/docs/harness/skills/test-review.md): Acceptance criteria validation.
- [docs-review.md](file:///D:/coding/sn/demo/docs/harness/skills/docs-review.md): Planning and state documentation updates.
- [context7.md](file:///D:/coding/sn/demo/docs/harness/skills/context7.md): Procedure for external library documentation lookups.
- [sn-docs.md](file:///D:/coding/sn/demo/docs/harness/skills/sn-docs.md): Procedure for ServiceNow/SDK documentation lookups.

## Source of Truth

- Backlog state: ServiceNow Agile `rm_story`
- Backlog mirror: `docs/harness/backlog.json`
- Product requirements: `docs/servicenow-personal-todo-prd.md`
- Story detail: `docs/stories/*.md`
- App implementation: `src/`
