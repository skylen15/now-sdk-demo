# US005 - ESM-Only GlideQuery Mock And 2.0 Migration

## Summary

Add a full in-memory GlideQuery mock and migrate the package, tests, and examples to ESM-only version 2.0.

## Acceptance Criteria

- `MockGlideQuery`, `MockOptional`, and `MockStream` are public ESM exports.
- GlideQuery reads, mutations, aggregates, helpers, and explicit mock limitations are tested.
- MockGlideRecord and MockGlideQuery share query evaluation behavior.
- Rhino globals and classic Script Include tests work without CommonJS.
- Packed package supports ESM import and rejects CommonJS require.
- Read-only `references/` and `repos/jest/` are unchanged.

## Testing

- Run `npm test`.
- Run `npm run build`.
- Run package smoke verification.
- Run `npm run harness:validate`.
