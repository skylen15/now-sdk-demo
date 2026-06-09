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
6. For UI Page changes, run Playwright installed-page smoke tests when instance
   validation is approved. Load credentials from the ignored root `.env`, use
   uniquely named test records, and clean them up after the run.
7. Record commands, pass/fail results, and unverified checks in `session-handoff.md`.
8. Update `state.md` and `decisions.md` when their durable content changed.
9. Confirm unrelated changes were not included.

The bootstrap runs the same checks as `npm run harness:validate`. A harness consistency failure
blocks implementation and completion until corrected.

## Required Before PR Merge

1. Required CI checks pass, including harness validation, tests, build, diff
   checks, and available secret/security scans.
2. One reviewer approves; platform/security-sensitive changes require two.
3. The author does not approve their own PR.
4. Unresolved review comments are closed.
5. The PR identifies story, verification evidence, release impact, feature flags,
   data/schema impact, and rollback considerations.
6. Missing CI capabilities are recorded as gaps rather than silently omitted.

## Required Before UAT or Production

1. Follow `release-workflow.md` and complete
   `deployment-change-checklist.md`.
2. Record exact commit, artifact/checksum or reproducible-build procedure, target
   SDK alias, target instance, and verification evidence.
3. Confirm the ServiceNow Change Request is approved and the change window is
   open.
4. Confirm implementation, validation, rollback, data-impact, and monitoring
   plans are attached.
5. Production completion requires recorded post-deploy smoke and monitoring
   evidence. A merged or locally complete story is not Done.

## Completion Blocking Policy

- A failed required local check blocks completion.
- An unrun required local check blocks completion unless the command requires prohibited or explicitly unapproved setup.
- Required instance, deploy, REST, ATF, or installed-page checks may be recorded as externally blocked when they require explicit approval or unavailable access.
- Missing `.env` credentials, authentication failure, or unavailable instance
  access blocks Playwright verification and must be recorded explicitly.
- Externally blocked checks must remain visible in `state.md` and `session-handoff.md`; the story may be described as locally complete, but not fully verified.
- Advisory checks may be documented as residual risk only when the active story's acceptance criteria do not depend on them.

Instance operations, dependency installation, deploy, install, and transform remain
subject to the explicit approval rules in the root `AGENTS.md`.
