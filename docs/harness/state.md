# Harness State

## Current Story

US005 - Filters and Search

## Current Phase

US005 locally implemented after platform-sme, security-sme, ui-sme, test-sme, and docs-sme review.

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
- Ran the US005 SME subagent workflow before editing.
- Added client-side US005 filters/search over ACL-visible task data.

## Active Risks

- Story status values are currently raw ServiceNow state values until the harness defines display-state mapping.
- ATF coverage is planned but not implemented.
- US005 timezone boundary behavior still needs instance validation with known user timezone settings.
- Task-tag cross-owner reference integrity needs negative instance tests; ACLs still enforce owner isolation for reads/writes.

## Next Action

Run local build/static checks, then perform instance smoke/REST/ATF validation if explicitly requested.
