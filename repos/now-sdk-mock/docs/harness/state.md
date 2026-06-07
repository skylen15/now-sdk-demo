# Harness State

## Current Story
US005 - ESM-Only GlideQuery Mock And 2.0 Migration

## Current Phase
Verification Complete

## Durable Status

- Harness customized for the `now-sdk-mock` TypeScript/Jest library.
- Architecture, quality baseline, technical debt, decisions, and prioritized backlog are documented.
- Production source is under `src/`; unit verification is under `test/unit/`.
- Public compatibility centers on package exports, ServiceNow-like behavior, and isolated in-memory state.
- US001 harness customization is complete.
- US002, US003, and US004 are complete.
- US005 is active.
- US005 implementation and verification are complete and ready for review.
- TD001-TD006 are resolved with documented and tested contracts.
- Public `resetMockState()` provides complete process-local isolation.
- Production TypeScript is strict and generated backup files are prevented.
