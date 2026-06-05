# Client UI Guide

## React UI Conventions

- Prefer components from `@servicenow/react-components` over hand-rolled HTML controls when an appropriate ServiceNow component exists.
- Before using `@servicenow/react-components`, inspect the local package docs under `node_modules/@servicenow/react-components/docs`.
- Keep React UI patterns compatible with the Now SDK UI page build and the existing client source under `src/client/`.

## Routing and Data Fetching

- Use TanStack Router for client routing. Keep route definitions under `routes/` and regenerate `routeTree.gen.ts` with the project route-generation script instead of editing it by hand.
- Use TanStack Query for client server-state, queries, mutations, cache invalidation, and optimistic updates.
- When working on TanStack Router or TanStack Query patterns, inspect the relevant vendored source under `repos/` for examples and tests. Leave vendored source untouched and follow `repos/AGENTS.md` for repository-specific rules.
