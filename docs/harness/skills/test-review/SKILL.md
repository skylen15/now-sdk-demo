---
name: test-review
description: >-
  Maps Personal Todo stories and changes to validation coverage, including
  Now SDK builds, ATF, REST/Table API checks, and React UI smoke tests.
---

# Test Review Skill

## When To Use

Use this skill for every story or code change before declaring work complete.

## Review Areas

- Acceptance criteria coverage
- Now SDK build validation
- ATF/server-side validation
- REST/Table API validation
- React UI smoke tests

## Rules

- Every story must have a clear validation path.
- Before recommending custom test harnesses or scripts, verify whether Now SDK build validation, ATF, REST/Table API checks, React smoke tests, or existing project validation already cover the needed scenario.
- Security stories need negative cross-user tests.
- UI stories need installed-page smoke tests when feasible.
- Build validation is required after Fluent or client changes.

## Tool Guidance

### Server-Side Behavior

- Test server-side script behavior locally with `@kobidev/now-sdk-mock` first when feasible.
- Use the cloned source under `repos/now-sdk-mock` for examples and API details before relying on memory.
- Use ATF later only when behavior cannot be validated locally or requires instance/platform enforcement.

### UI Page Behavior

- Use Playwright for installed UI Page validation whenever instance validation
  is approved.
- Load `SERVICENOW_BASE_URL`, `SERVICENOW_USERNAME`, and
  `SERVICENOW_PASSWORD` from the ignored root `.env`; never commit credentials
  or authenticated browser state.
- Create uniquely named test records and clean them up after each run.
- Record the command, target instance, pass/fail result, cleanup result, and any
  authentication blocker in `docs/harness/session-handoff.md`.
- Use the cloned source under `repos/playwright` for examples and API details before relying on memory.
- Run installed-page smoke tests when instance validation is in scope.

## Output Checklist

- [ ] Test matrix (which areas need automated/manual test coverage?)
- [ ] Required setup data (any mock data needed?)
- [ ] Manual or ATF scenarios (what are the test steps?)
- [ ] Gaps and residual risks (any missing coverage or risks?)
