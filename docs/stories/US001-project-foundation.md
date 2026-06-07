# US001 - Establish Project Harness Baseline

## Summary

Capture a repository-grounded operating baseline for future `now-sdk-mock` story work.

## Acceptance Criteria

- `AGENTS.md` describes project context and verification commands.
- `ARCHITECTURE.md` describes boundaries, layers, flows, and constraints.
- Harness state, backlog, decisions, quality score, debt, and handoff reflect existing code and documentation.
- Portable harness workflows, rules, skills, and scripts are unchanged.
- Harness validation passes.

## Testing

- Run `npm.cmd run harness:init`.
- Run `npm.cmd run harness:validate`.

## Outcome

Completed on 2026-06-07. No production source behavior changed.
