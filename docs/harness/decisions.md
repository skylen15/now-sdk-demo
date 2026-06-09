# Decisions

## DEC-001: Use `rm_story` for Harness Stories

Status: Accepted

Decision:
Use classic ServiceNow Agile `rm_story` records for Personal Todo harness stories, with one parent `rm_epic`.

Reason:
The schema shows `sn_safe_story` extends `rm_story` and belongs to the SAFe model. Using SAFe would imply extra structure such as features, program increments, and agile release trains that this project does not currently need.

Consequences:
`sn_safe_story` is out of scope unless the project intentionally adopts SAFe planning later.

## DEC-002: ServiceNow Agile Is the Backlog Source

Status: Accepted

Decision:
ServiceNow Agile records are the backlog source of truth. `docs/harness/backlog.json` is a generated repo mirror.

Reason:
The project has ServiceNow Agile available on `pdi-qkb-o2`, and backlog state should live in the platform while remaining visible to local agents.

Consequences:
Agents should query/update ServiceNow Agile for backlog state when requested, then regenerate `backlog.json`.

## DEC-003: Introduce Harness Without Replacing Current Implementation

Status: Accepted

Decision:
Keep the current `src/` implementation intact while introducing the harness.

Reason:
The app already has Now SDK Fluent and React source. The harness should provide planning, review, and backlog control before any incremental rebuild work.

Consequences:
Future rebuild work should proceed story-by-story through the harness rather than deleting current implementation upfront.

## DEC-004: US005 Date Bucket Semantics

Status: Accepted

Decision:
US005 due-date buckets are derived in the client from the ServiceNow `due_at` actual value. Actual `GlideDateTime` strings are treated as UTC instants, converted to the browser/user local date key, and compared with the current local date for `today`, `upcoming`, and `overdue`. Completed tasks are excluded from `overdue`.

Reason:
The Now Table API returns actual Date/DateTime values separately from display values when `sysparm_display_value=all` is used. The UI acceptance criteria require user-local date interpretation without adding server metadata for US005.

Consequences:
Boundary behavior near midnight must be validated on an instance with a known user timezone. Later date-editing stories should preserve this same local-display/UTC-storage model.

## DEC-005: US005 Structured Client Filter State

Status: Accepted

Decision:
US005 uses a structured client filter state with `{status, due, priority, tag, search, sort}` and derives the visible list locally from ACL-visible Table API records. The client does not build arbitrary encoded queries from search text.

Reason:
This keeps search/filter behavior reload-free, avoids encoded-query injection risks, and gives US008 saved filters a stable state shape to persist later.

Consequences:
Client filtering is not a security boundary. Owner isolation remains enforced by ACLs, and US008 can persist the same state shape in `x_2063979_todo_saved_filter.filter_state`.

## DEC-006: Skills Carry Review Expertise

Status: Accepted

Decision:
Harness review guidance is stored as portable base-spec skill packages under `docs/harness/skills/<skill-name>/SKILL.md`. Story work should load and apply the relevant skills inline. Subagents remain optional isolated workers for parallel execution, tool scoping, or verbose long-running validation, and should use the same skills rather than duplicate review instructions.

Reason:
Project review knowledge should be reusable across implementation, review, and validation passes without requiring orchestration-specific prompts. A `SKILL.md` package keeps each area of expertise discoverable and portable while preserving the existing harness workflow.

Consequences:
Future platform, security, UI, test, and documentation guidance should be added to the relevant skill package first. Add subagent definitions only when isolation or parallel execution is required.

## DEC-007: Preserve Platform State and Add Local Normalized State

Status: Accepted

Decision:
Keep each story's raw ServiceNow `state` value in `backlog.json` and add a
`normalizedState` value limited to `planned`, `active`, `blocked`, or `complete`.
Exactly one local story must be `active`.

Reason:
Raw ServiceNow state values preserve source fidelity but are not readable enough
for local agent scope control. A separate normalized value avoids guessing at
instance-specific state mappings while giving the harness deterministic workflow
states.

Consequences:
Backlog regeneration must preserve or deliberately recalculate `normalizedState`.
The harness validator rejects missing, invalid, duplicate, or multiple-active
story state.

## DEC-008: US006 Calendar-Date Storage

Status: Accepted

Decision:
US006 treats a selected due date as a browser-local calendar date and stores it in the existing `due_at` GlideDateTime field as the UTC internal-format instant corresponding to 23:59:59 on that local date. Clearing the date writes an empty value.

Reason:
The existing US002 data model uses `DateTimeColumn`, while US005 and US006 present due dates as local calendar dates. ServiceNow GlideDateTime actual values use UTC internal format, and end-of-local-day storage keeps the task due for the full selected local date.

Consequences:
Client display, filtering, sorting, and overdue styling must continue converting the actual UTC value back to a browser-local date. Instance validation with a known user timezone remains required around daylight-saving and midnight boundaries.

## DEC-009: Biweekly Trunk-Based Release Train

Status: Accepted

Decision:
Use protected `main` for integrated work, short-lived story/bug branches, and a
temporary `release/<semantic-version>` branch for each biweekly release. Keep
`main` open while the release candidate moves through TEST, UAT, and PROD.
Promote the same immutable artifact when supported, otherwise use and record a
reproducible build from the exact release commit. Require an approved ServiceNow
Change Request for UAT and PROD.

Reason:
Git branches identify code versions; instances are deployment destinations.
Permanent environment branches create drift and merge risk. A temporary release
branch freezes the production candidate without stopping new work on `main`.

Consequences:
Release fixes must merge back into `main`. Production commits receive semantic
version tags. A story is Done only after production deployment and post-deploy
validation. Release owners must retain release evidence, checksums or build
details, approvals, rollback plans, and Change Request closure evidence.

## DEC-010: Store Task Notes on Todo Task

Status: Accepted

Decision:
Store optional US007 notes directly in `x_2063979_todo_task.notes`.

Reason:
Notes are single-user task context, not comments or activity records. Existing
task column supports atomic edits and search without another related table.

Consequences:
Notes follow task owner ACLs and task lifecycle. Comments, history, and shared
notes remain out of scope.

## DEC-011: Use In-App Task Reminder State

Status: Accepted

Decision:
Use the existing owner-scoped `x_2063979_todo_task.reminder_at` field and show
upcoming or due reminder state in the task row. Do not add an email notification,
custom event, scheduled job, or custom notification engine for US010.

Reason:
Now SDK supports email notification and event artifacts, but those mechanisms
add trigger, recipient, and delivery configuration beyond the story's
lightweight personal reminder scope. The in-app indicator delivers reminder
state whenever the user opens the Todo UI and preserves owner isolation through
existing task ACLs.

Consequences:
Reminders do not proactively notify users outside the Todo UI. Installed-page
validation must confirm local-time display and due-state behavior.
