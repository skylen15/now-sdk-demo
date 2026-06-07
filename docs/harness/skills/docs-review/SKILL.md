---
name: docs-review
description: >-
  Reviews planning, story, harness state, decision log, backlog mirror, and
  implementation documentation updates for the Personal Todo app.
---

# Docs Review Skill

## When To Use

Use this skill when story files, harness state, decisions, acceptance criteria alignment, backlog mirrors, or implementation notes may need updates.

## Review Areas

- PRD alignment
- Story source files
- Harness state and decisions
- Backlog mirror consistency
- Implementation notes

## Rules

- Keep durable decisions in `decisions.md`.
- Before recommending new documentation structures, verify whether the PRD, story files, harness state, decisions, backlog mirror, or existing rules already provide the needed place for the information.
- Keep canonical current story, phase, risks, and next action in `state.md`.
- Keep only session-specific completed work, verification evidence, blockers, and resume context in `session-handoff.md`.
- Do not duplicate long story bodies in `backlog.json`.
- Preserve ServiceNow Agile as the backlog source of truth.

## Output Checklist

- [ ] Documentation findings (what docs need updates or alignment?)
- [ ] Files needing updates (which .md or JSON files need changes?)
- [ ] Decision log entries (any new architectural decisions to log?)
- [ ] Backlog/state sync notes (status updates for state.md or backlog.json?)
