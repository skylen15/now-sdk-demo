# Agent Guide

<!-- spec-harness:start -->
## Spec Harness

- Run `npm run harness:init` before story work.
- Follow `docs/harness/story-workflow.md` and `docs/harness/verification.md`.
- Read and update `docs/harness/session-handoff.md`.
<!-- spec-harness:end -->

## Project Context

- This repository publishes `now-sdk-mock`, a TypeScript/Jest library for testing ServiceNow server-side code without an instance.
- Treat `src/index.ts` and barrel exports below `src/` as the public package surface.
- Preserve compatibility with both SDK-style imports and classic Script Includes initialized through `initSnRhinoEnvironment()`.
- Keep mocks deterministic and isolated; reset singleton-backed state in tests.
- Add or update focused Jest unit tests for behavioral changes.
- Do not create or retain generated `src/**/*.bak`; do not edit `dist/` or `coverage/` artifacts as source.

## Tech Stack

- Runtime and package format: Node.js with npm, published as ESM-only JavaScript in `dist/`.
- Source language: TypeScript 5 with `NodeNext` module resolution and generated declaration files.
- Test framework: Jest 29 with `ts-jest`, V8 coverage, Jest mocks, and Jest matchers.
- Build tooling: TypeScript compiler, `ctix` barrel export generation, `tsc-alias`, and `rimraf`.
- ServiceNow integration: `@servicenow/glide` aliased to `servicenow-glide`, ServiceNow SDK ESLint plugin, Glide type declarations, and Rhino-style global initialization.
- Supporting libraries include `date-fns`, Ramda, GraphQL, and `app-root-path`.

## Read-Only Reference Material

- Treat `references/` as read-only examples for JavaScript API behavior and implementation patterns.
- Treat `repos/jest/` as a read-only upstream Jest source reference for mock, matcher, runner, and testing behavior.
- Never modify, format, generate files into, or include project implementation changes under these directories.
- Use references to inform changes in this project's `src/`, `test/`, examples, and documentation; do not copy upstream internals unnecessarily.
- Do not run repository-wide formatting or cleanup commands that can mutate the read-only reference directories.

## Project Verification

- Run `npm test` for behavior changes.
- Run `npm run typecheck` for production TypeScript changes.
- Run `npm run build` for exports, types, or packaging changes.
- Run `npm run harness:validate` before handoff.
