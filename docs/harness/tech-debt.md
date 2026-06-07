# Technical Debt Tracker

This document tracks actionable, cross-story engineering debt that does not
belong solely to the active story. Story requirements and status remain in
ServiceNow Agile, `backlog.json`, and `docs/stories/`.

## Entry Format

Each entry should include:

- ID and concise title
- Status: `Open`, `Planned`, `Blocked`, or `Resolved`
- Impact and affected area
- Evidence or trigger
- Resolution condition
- Related story or decision, when applicable

## Open Debt

### TD-002: Validate Cross-Owner Reference Integrity

Status: Blocked

Impact:
Task-tag reference behavior needs negative instance validation in addition to
existing ACL enforcement.

Evidence:
Cross-owner negative tests are listed as an active risk in `state.md`.

Resolution condition:
Instance tests demonstrate that users cannot create or access cross-owner task
tag relationships.

### TD-003: Validate Date Behavior On Instance

Status: Blocked

Impact:
US005-US006 timezone, stored-value, Table API write, and installed-page
behavior are locally covered but not fully instance-verified.

Evidence:
The remaining checks are recorded in `state.md` and `session-handoff.md`.

Resolution condition:
REST and installed-page checks pass with a known user timezone, including
midnight and daylight-saving boundaries where applicable.

## Resolved Debt

### TD-001: Add ATF Coverage

Status: Resolved

Resolved: 2026-06-07

Evidence:
`src/fluent/tests/todo-critical-flows.now.ts` defines build-validated,
repeatable ATF coverage for critical task CRUD/defaults and ACL-enforced owner
isolation across task, tag, task-tag, and saved-filter records.

Remaining validation:
Run the ATF tests on an installed instance when instance operations are
explicitly approved. Primary installed-page UI smoke coverage remains tracked
as story-specific external validation.

## Maintenance Rules

- Add debt only when it spans stories or remains after a story is locally
  complete.
- Keep story-scoped remaining work in the story and `session-handoff.md`.
- Move resolved entries to a `Resolved Debt` section with evidence and date.
- Update `quality-score.md` when resolving debt changes a quality rating.
