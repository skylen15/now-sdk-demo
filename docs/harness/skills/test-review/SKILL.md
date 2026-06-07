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

## Output Checklist

- [ ] Test matrix (which areas need automated/manual test coverage?)
- [ ] Required setup data (any mock data needed?)
- [ ] Manual or ATF scenarios (what are the test steps?)
- [ ] Gaps and residual risks (any missing coverage or risks?)
