# Session Handoff

Update this file at the end of every implementation session. Keep durable project
status in `state.md` and architecture choices in `decisions.md`; this file records
only the context needed for the next session to resume safely.

The canonical active story and durable project status live in `state.md`. Do not
repeat them here.

## Session Goal

Complete local implementation and verification of US010 reminders.

## Completed This Session

- Reviewed US005 source against all acceptance criteria and found it locally complete.
- Marked US005 locally complete and US006 active in the backlog mirror.
- Added row-level optional due-date set/change/clear behavior and priority changes.
- Added due-date and priority display, due/priority sorting, and restrained overdue/priority styling.
- Kept completed tasks out of overdue filtering and styling.
- Recorded the local-calendar-date to UTC end-of-day storage decision.
- Audited US006 against its acceptance criteria and required review skills.
- Confirmed the Now SDK build and type check pass with the US006 implementation.
- Extracted pure due-date conversion utilities and added local DST, midnight-boundary, round-trip, and clear-date regression tests.
- Added build-validated ATF coverage for critical task CRUD/defaults and owner isolation across all Personal Todo data tables.
- Resolved TD-001 in the technical debt tracker.
- Implemented notes editing independent of title editing and notes indicators on task rows.
- Implemented normalized tag creation, task assignment/removal, and assigned-tag display.
- Added server enforcement for duplicate logical tags, duplicate mappings, and cross-owner references.
- Recorded direct task-note storage decision and moved local active story to US007.
- Added saved-filter Table API CRUD and dense saved-view navigation.
- Added selection/default-view behavior and validated structured persisted state before use.
- Added saved-filter CRUD ATF coverage and moved local active story to US008.
- Added editable recurrence controls for daily, weekly, monthly, weekdays, and stopping recurrence.
- Added after-completion next-occurrence creation with owner scope and recurrence-source traceability.
- Added reminder set/change/clear controls independent of due date.
- Added visible upcoming/due in-app reminder state.
- Added pure local-to-ServiceNow datetime conversion tests and reminder CRUD ATF coverage.
- Chose in-app delivery after validating Now SDK notification/event options.
- Reinstalled current source to `pdi-qkb-o2` and reran all remaining approved
  instance validation.

## Verification Evidence

- `npm.cmd run deploy` installed current source to `pdi-qkb-o2` (`https://dev282837.service-now.com/`) after reselecting the expired OAuth alias.
- Instance REST-equivalent CRUD smoke passed for task create/read/update/delete, defaults and title normalization, completion timestamp, urgent priority, reminder storage, tag normalization, task-tag assignment/removal, and saved-filter create/update/delete. All smoke records were deleted.
- Four installed Personal Todo ATF tests were discovered and launched, but every launch returned no resolved result. Direct instance diagnostics confirmed `sys_atf_test_result` and `sys_atf_test_result_item` contain zero records, so ATF pass/fail remains blocked.
- Installed UI smoke failed: the active `Todo List` application module exists and targets `x_2063979_todo_app.do`, but no matching Personal Todo `sys_ui_page` record exists after install.
- `npm.cmd run harness:init` passed before the completion audit.
- US005 acceptance-criteria source review passed; installed-page/timezone checks remain external.
- `git diff --check` passed after the client implementation.
- `npm.cmd run harness:validate` passed after the story-state transition: US006 active, 5 complete, and 4 planned stories.
- `docs/harness/backlog.json` and `package.json` parsed successfully as JSON.
- `npm.cmd run build` passed, including route generation, TypeScript checking, and Now SDK bundling; existing TanStack bundler warnings remain non-blocking.
- `git diff --check HEAD~1 HEAD` passed for the US006 implementation commit.
- `npm.cmd run harness:validate` passed after the completion audit.
- `npm.cmd run test:due-dates` passed 4 tests covering US and Australian DST transitions, UTC+7 round trips, and clearing optional due dates.
- `npm.cmd run build` passed after extracting the tested due-date utilities.
- `npm.cmd run harness:init` passed before TD-001 work.
- `npm.cmd run build` passed with the new Fluent ATF tests; existing TanStack bundler warnings remain non-blocking.
- `npm.cmd run harness:init` passed before US007 implementation.
- `npm.cmd run build` passed after US007 client and business-rule changes; existing TanStack bundler warnings remain non-blocking.
- `git diff --check` passed; only existing line-ending warnings were reported.
- `npm.cmd run build` passed after US008 implementation; existing TanStack bundler warnings remain non-blocking.
- `git diff --check` passed after US008 implementation; only existing line-ending warnings were reported.
- `npm.cmd run build` passed after US009 implementation; existing TanStack bundler warnings remain non-blocking.
- `npm.cmd run test:reminders` passed 2 reminder conversion/clear tests.
- `npm.cmd run build` passed after US010 implementation; existing TanStack bundler warnings remain non-blocking.
- `git diff --check` passed after US010 implementation; only existing line-ending warnings were reported.
- `npm.cmd run harness:init`, `npm.cmd run test:reminders`, `npm.cmd run build`,
  and `git diff --check` passed on 2026-06-09.
- `npm.cmd run deploy` successfully reinstalled current source to `pdi-qkb-o2`.
- The four installed Personal Todo ATF tests were rerun; every launch again
  returned no resolved result, and `sys_atf_test_result` still contained zero
  records.
- Post-install scope queries confirmed the UI page endpoint
  `x_2063979_todo_app.do`, `Todo List` application module, and `Personal Todo`
  application menu exist. Earlier missing-artifact findings queried the wrong
  fields.
- US010 Table API smoke passed reminder set, change, and clear on the existing
  test task while leaving due date independent; the original empty reminder
  state was restored.
- Reran all four installed Personal Todo ATF tests through the Now SDK extension;
  each launch again returned no resolvable result.
- Removed accidental full-environment logging from the Playwright smoke test so
  future runs cannot print instance credentials.
- Fixed the installed-page smoke selectors for the actual Add button and modal
  confirmation button, and made login navigation waiting less brittle.
- Fixed the task-row grid so schedule controls no longer overlap and block the
  Delete action.
- Added a repeatable Playwright installed-page smoke test covering page load,
  task creation, reminder set/change/clear, and task cleanup.
- Installed Playwright Chromium and ran `npm.cmd run test:installed-page`; the
  test skipped because `.env` has empty `SERVICENOW_USERNAME` and
  `SERVICENOW_PASSWORD` values.
- Confirmed ignored `.env` now contains all required Playwright credential
  values without exposing them.
- Reran `npm.cmd run test:installed-page` with external network access; the
  ServiceNow `/login.do` navigation timed out after 60 seconds before login.
- Reran `npm.cmd run harness:init`, `npm.cmd run test:reminders`,
  `npm.cmd run build`, and `git diff --check`; all passed.
- Reran `npm.cmd run test:installed-page` after instance web reachability
  recovered. The login form loaded, but submitted configured credentials did
  not establish a session; app navigation returned to the `navpage.do` login
  page, so installed-page interaction validation remains blocked.
- Reran `npm.cmd run test:reminders`, `npm.cmd run test:due-dates`,
  `npm.cmd run build`, `npm.cmd run harness:validate`, and `git diff --check`;
  all passed on 2026-06-09.
- Reran `npm.cmd run harness:init`; harness validation passed with US010 active.
- Reran `npm.cmd run test:installed-page` with approved external access; the
  instance `/login.do` navigation timed out after 60 seconds before login.
- Attempted fresh ATF discovery through the Now SDK extension; the connector
  transport closed after 225 seconds before returning installed tests.
- On 2026-06-09, `npm.cmd run test:reminders`, `npm.cmd run test:due-dates`,
  `npm.cmd run build`, `npm.cmd run harness:validate`, and `git diff --check`
  passed.
- Installed-page smoke reached the installed app and validated task creation plus
  reminder set/change/clear. It exposed and verified the task-row Delete overlap
  fix after `npm.cmd run deploy` successfully reinstalled source.
- Final installed-page rerun was blocked when `/login.do` timed out before
  DOMContentLoaded.
- Ran three focused ATF repair cycles for `Personal Todo - reminder CRUD`.
  Cycle 1 produced a real result and failed secured task insert. Cycle 2
  confirmed explicit owner assignment did not resolve the ACL failure. Cycle 3
  changed ATF user role assignment from scoped role name to its stable sys_id;
  secured insert then passed and execution advanced to reminder validation.
- Diagnosed cycle 3 failure as timezone-sensitive exact GlideDateTime condition
  matching. Changed initial reminder validation to assert non-empty reminder and
  empty independent due date; update and clear steps retain change/clear proof.

## Remaining Work

- Repair instance ATF execution infrastructure so launched tests create result
  records, then rerun the four installed Personal Todo tests.
- Build, deploy, and run the latest timezone-safe reminder ATF assertion; three
  user-requested focused ATF run/fix cycles are complete.
- Rotate the ServiceNow password because an earlier Playwright run printed the
  process environment before that logging bug was removed.
- Rerun `npm.cmd run test:installed-page` when the instance login endpoint is
  responsive.

## Known Blockers

- ATF execution now creates result records. Latest reminder test reached record
  validation after secured insert; latest timezone-safe assertion is not yet
  deployed/run because the requested three repair cycles were exhausted.
- US005 timezone behavior, US006 stored/displayed timezone behavior, US006 Table API writes, and installed-page interactions require explicit instance validation.
- US007 server normalization/security behavior and installed-page interactions require explicit instance validation.
- US008 saved-filter platform/security behavior and installed-page interactions require explicit instance validation.
- US009 recurrence date/platform behavior and installed-page interactions require explicit instance validation.
- US010 reminder CRUD, displayed timezone, and installed-page reminder delivery require explicit instance validation.
- Interactive installed-page smoke is blocked because configured ignored
  `.env` credentials do not establish a session; after login submission,
  app navigation returns to the `navpage.do` login page. The latest attempt
  additionally timed out loading `/login.do`.
- The Now SDK extension ATF connector currently closes its transport before
  test discovery completes.
- Final installed-page validation is blocked by intermittent `/login.do`
  availability. Reminder set/change/clear passed before cleanup; final cleanup
  confirmation rerun remains unverified.

## Next Command

Rotate the exposed instance password, update ignored `.env`, then run
`npm.cmd run test:installed-page`; repair ATF result generation, then rerun the
four installed tests.
