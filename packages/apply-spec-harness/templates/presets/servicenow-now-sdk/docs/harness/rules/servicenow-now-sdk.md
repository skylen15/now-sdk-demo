# ServiceNow and Now SDK Rules

- Use `now-sdk-explain` for Now SDK and Fluent API details.
- Use project-local ServiceNow docs and schema references before relying on memory.
- Use the `pdi-qkb-o2` auth alias only when the task explicitly requires instance operations.
- Do not deploy, install, transform, download dependencies, or authenticate unless explicitly requested.
- Define metadata in `.now.ts` files under `src/fluent/`.
- Put reusable server-side implementation code under `src/server/`.
- Validate Fluent and client changes with `npm run build` when feasible.

