# Fluent Source of Truth Rules

- The repository is the source of truth for app implementation.
- ServiceNow instance changes are not complete until represented in source where the Now SDK supports them.
- Do not hand-edit `node_modules/`, `dist/`, `.now/`, or generated SDK output.
- Avoid manual edits under `src/fluent/generated/` except intentional mapping repair.
- Organize Fluent metadata by artifact type using kebab-case folders.
- If an artifact is unsupported by Fluent, document the limitation and the chosen source-control strategy in `decisions.md`.

