# Spec Harness Guide

- Use `docs/harness/` for spec-driven planning, skill-based review, backlog mirroring, state, and decision history.
- ServiceNow Agile is the backlog source of truth for harness stories. `backlog.json` is a repo mirror generated from the `pdi-qkb-o2` instance.
- Use `rm_story` for Personal Todo harness stories and `rm_epic` for the parent epic. Do not use `sn_safe_story` unless the project intentionally adopts SAFe planning.
- Keep `docs/stories/*.md` as story detail/source context, but sync story tracking state from ServiceNow Agile.
- Skill packages live under `docs/harness/skills/<skill-name>/SKILL.md` and are evaluated inline during the story workflow.
- Start sessions with `npm run harness:init`, resume from `session-handoff.md`, and require evidence from `verification.md` before completion.
