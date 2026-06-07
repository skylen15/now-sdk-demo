# Quality Score

This document records a lightweight, evidence-based view of product quality. It
is not a completion gate by itself; story completion remains governed by
`verification.md` and the active story acceptance criteria.

## Rating Scale

- `Verified`: required local and instance evidence exists.
- `Locally verified`: required local evidence exists; instance checks remain.
- `Partial`: meaningful coverage exists, with known required gaps.
- `Unverified`: no current evidence supports the area.

## Current Scorecard

| Area | Rating | Evidence | Primary Gap |
| --- | --- | --- | --- |
| Build and type safety | Locally verified | Now SDK build recorded in `session-handoff.md` | Continue running build after relevant changes |
| Client behavior | Locally verified | US005-US006 source review and due-date regression tests | Installed-page smoke validation |
| Platform metadata | Partial | Fluent source and build validation | Instance-side behavior validation |
| Security and isolation | Partial | ACL-based design and review rules | Negative cross-owner instance tests |
| Reliability | Partial | Harness validation, targeted local regression tests, and build-validated critical CRUD/owner-isolation ATF | Execute ATF and broaden installed-page coverage |
| Documentation and continuity | Locally verified | State, handoff, decisions, stories, and harness validation | Keep evidence current each session |

## Update Rules

- Update ratings only when evidence or a known gap changes.
- Link or name the command, story, or document that supports a rating.
- Keep detailed command output in `session-handoff.md`, not here.
- Track actionable cross-story remediation in `tech-debt.md`.
- Do not use an aggregate numeric score; it can hide blocking gaps.
