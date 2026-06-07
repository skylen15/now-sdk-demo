# Harness State

## Current Story

US006 - Due Date and Priority

## Current Phase

US006 locally implemented after confirming US005 local acceptance-criteria coverage and applying platform-review, security-review, ui-review, test-review, and docs-review.

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

## Active Risks

- ATF coverage is planned but not implemented.
- US005 timezone boundary behavior still needs instance validation with known user timezone settings.
- US006 build and installed-page/REST validation remain blocked until local dependencies or explicit instance access are available.
- US006 end-of-local-day storage needs instance validation around daylight-saving and midnight boundaries.
- Task-tag cross-owner reference integrity needs negative instance tests; ACLs still enforce owner isolation for reads/writes.

## Next Action

Make local dependencies available and rerun `npm run build`, then perform US006 installed-page and REST smoke validation if explicitly requested.
