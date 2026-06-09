# Harness State

## Current Story

US010 - Reminders

## Current Phase

US010 locally complete after passing reminder conversion tests, the Now SDK
build, successful reinstall, and all feasible instance validation.

## ServiceNow Agile

- Instance alias: `pdi-qkb-o2`
- Epic table: `rm_epic`
- Story table: `rm_story`
- Epic: `EPIC0010001`
- Epic sys_id: `1941c35dc3510790d65e5b2ed4013186`
- Backlog mirror: `docs/harness/backlog.json`
- Last sync: `2026-06-05`

## Last Completed

- Created the harness file structure.
- Created one Personal Todo Agile epic.
- Created ten Personal Todo Agile stories from `docs/stories/*.md`.
- Generated `backlog.json` from ServiceNow Agile query results.
- Reimplemented the US001-US004 baseline with Now SDK metadata preserved.
- Ran the US005 skill review workflow before editing.
- Added client-side US005 filters/search over ACL-visible task data.
- Reviewed US005 against its acceptance criteria and found no local implementation blockers.
- Added US006 row-level due-date and priority editing, local-date display, due/priority sorting, and restrained overdue/priority styling.
- Added local regression coverage for due-date clearing, timezone round trips, and DST-transition end-of-day conversion.
- Added task notes editing, notes indicators, tag creation, assignment, removal, and row display.
- Added duplicate tag normalization enforcement and task-tag owner/reference validation.
- Added named saved-filter CRUD, selection, default-view reset, and structured filter-state persistence.
- Added build-validated saved-filter CRUD ATF coverage.
- Added editable daily, weekly, monthly, and weekday recurrence.
- Added owner-scoped next-occurrence creation with source traceability.
- Added optional task reminder set/change/clear controls and visible upcoming/due reminder state.
- Added build-validated reminder CRUD ATF coverage.

## Active Risks

- Current source installed successfully on `pdi-qkb-o2`; REST-equivalent CRUD smoke passed on 2026-06-09.
- Installed UI page endpoint, application module, and application menu were
  confirmed after reinstall; interactive UI smoke remains unrun.
- ATF execution now produces result records. Three focused reminder ATF repair
  cycles resolved secured insert by assigning the scoped role via stable role
  sys_id; latest failure was a timezone-sensitive exact datetime assertion.
- Critical CRUD and owner-isolation ATF tests are implemented and build
  validated; instance execution remains pending explicit approval.
- US005 timezone boundary behavior still needs instance validation with known user timezone settings.
- US006 installed-page validation remains pending interactive smoke.
- US006 end-of-local-day conversion passes local DST and midnight-boundary regression tests; stored/displayed values still need instance validation.
- Task-tag cross-owner reference integrity needs negative instance tests; ACLs still enforce owner isolation for reads/writes.
- Installed-page interactions for US007-US010 remain pending interactive smoke.
- US010 Table API reminder set/change/clear smoke passed on 2026-06-09; original
  test-task reminder state was restored.
- ATF validation for US002, US003, US008, and US010 remains incomplete. Result
  generation works; latest timezone-safe reminder assertion still needs deploy
  and execution.
- Repeatable Playwright installed-page reminder smoke coverage is implemented,
  and the instance login page is reachable, but configured ignored `.env`
  credentials do not establish a session; app navigation returns to the login
  page.
- Latest approved installed-page rerun timed out loading `/login.do`; latest
  Now SDK extension ATF discovery attempt ended with a closed transport before
  tests were returned.
- Installed-page smoke validated task creation and reminder set/change/clear,
  then exposed a task-row layout overlap blocking Delete. Source was fixed,
  rebuilt, and reinstalled; final rerun was blocked by `/login.do` timeout.
- An earlier Playwright smoke run printed the process environment. The logging
  bug is removed, but the configured instance password must be rotated.

## Next Action

Rotate the exposed instance password, update ignored `.env`, rerun installed-page
smoke when `/login.do` is responsive, then repair ATF result generation and
rerun installed tests.
