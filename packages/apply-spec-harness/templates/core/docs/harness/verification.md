# Verification Contract

Completion requires evidence, not an agent confidence statement.

## Required Before Implementation

1. Run `npm run harness:init`.
2. Read `state.md`, `session-handoff.md`, `backlog.json`, and the active story.
3. Confirm the active story's acceptance criteria and `## Testing` section define its definition of done.
4. Confirm the working tree does not contain conflicting user changes.

## Required Before Declaring a Story Complete

1. Re-read the active story acceptance criteria.
2. Review the changed-file diff against every relevant skill and rule.
3. Run `npm run build` when dependencies are available.
4. Run the story-specific checks identified by `test-review/SKILL.md`.
5. For server-side script changes, run feasible local checks with `@kobidev/now-sdk-mock` before planning ATF validation.
6. For UI Page changes, run feasible Playwright checks before instance smoke validation.
7. Record commands, pass/fail results, and unverified checks in `session-handoff.md`.
8. Update `state.md` and `decisions.md` when their durable content changed.
9. Confirm unrelated changes were not included.

The bootstrap runs the same checks as `npm run harness:validate`. A harness consistency failure
blocks implementation and completion until corrected.

## Completion Blocking Policy

- A failed required local check blocks completion.
- An unrun required local check blocks completion unless the command requires prohibited or explicitly unapproved setup.
- Required instance, deploy, REST, ATF, or installed-page checks may be recorded as externally blocked when they require explicit approval or unavailable access.
- Externally blocked checks must remain visible in `state.md` and `session-handoff.md`; the story may be described as locally complete, but not fully verified.
- Advisory checks may be documented as residual risk only when the active story's acceptance criteria do not depend on them.

Instance operations, dependency installation, deploy, install, and transform remain
subject to the explicit approval rules in the root `AGENTS.md`.
