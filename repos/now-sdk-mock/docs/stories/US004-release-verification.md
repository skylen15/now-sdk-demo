# US004 - Harden Package Release Verification

**Status:** Complete

## Summary

Verify that built and packed artifacts work for real package consumers.

## Acceptance Criteria

- A repeatable check validates `npm pack` contents.
- Import, require, and TypeScript declaration consumption are smoke-tested from the packed artifact.
- Public barrel exports are checked for accidental omissions.
- Release verification is documented.

## Testing

- Run `npm run build`.
- Run the package consumer smoke test.
- Run `npm test`.
- Run `npm run harness:validate`.

## Completion Evidence

- `npm run package:smoke` verifies ESM consumption, declarations/exports, reset API, and package contents.
- Build tooling prevents `.bak` files from remaining in source or packed artifacts.
