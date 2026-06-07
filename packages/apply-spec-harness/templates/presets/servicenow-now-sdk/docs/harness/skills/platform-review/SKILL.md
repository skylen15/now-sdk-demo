---
name: platform-review
description: >-
  Reviews ServiceNow platform and Now SDK implementation concerns for the
  Personal Todo app, including Fluent metadata, server behavior, and build
  feasibility.
---

# Platform Review Skill

## When To Use

Use this skill for metadata, server, Fluent, ServiceNow platform, Now SDK, or build-impacting changes.

## Review Areas

- Fluent metadata in `.now.ts` files
- Tables, columns, roles, ACLs, business rules, UI pages, and server modules
- Glide/server-side behavior
- Scheduled processing, events, notifications, and Flow/API limitations
- Build feasibility with `npm run build`

## Rules

- The repo is the implementation source of truth.
- Before recommending custom code or new metadata, verify whether the ServiceNow platform or Now SDK already provides the needed feature or implementation pattern.
- Prefer Fluent metadata under `src/fluent/`.
- Put reusable server code under `src/server/`.
- Use `now-sdk-explain` and project-local ServiceNow docs before relying on memory.
- Do not suggest instance-only app changes unless they can be represented in source.

## Output Checklist

- [ ] Platform findings (are all platform concerns identified?)
- [ ] Required artifacts (which schema / Fluent files need creation or modification?)
- [ ] SDK limitations (any limitations encountered with Now SDK?)
- [ ] Validation steps (what platform validation is needed?)
