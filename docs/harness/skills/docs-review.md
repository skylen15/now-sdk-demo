# Docs Review Skill

Use this skill to maintain planning and implementation documentation for the Personal Todo app.

## Review Areas

- PRD alignment
- Story source files
- Harness state and decisions
- Backlog mirror consistency
- Implementation notes

## Rules

- Keep durable decisions in `decisions.md`.
- Before recommending new documentation structures, verify whether the PRD, story files, harness state, decisions, backlog mirror, or existing rules already provide the needed place for the information.
- Keep transient progress in `state.md`.
- Do not duplicate long story bodies in `backlog.json`.
- Preserve ServiceNow Agile as the backlog source of truth.

## Output Checklist

- [ ] Documentation findings (what docs need updates or alignment?)
- [ ] Files needing updates (which .md or JSON files need changes?)
- [ ] Decision log entries (any new architectural decisions to log?)
- [ ] Backlog/state sync notes (status updates for state.md or backlog.json?)
