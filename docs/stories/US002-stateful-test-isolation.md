# US002 - Strengthen Stateful Test Isolation

**Status:** Complete

## Summary

Provide a reliable, documented way for consumers and repository tests to reset all mutable mock state between tests.

## Acceptance Criteria

- Mutable singleton and static state is inventoried.
- A supported reset pattern clears relevant database, property, REST, event, cache, and global mock state.
- Unit tests prove state does not leak between representative test cases.
- README documents the supported reset pattern.

## Testing

- Run focused isolation tests.
- Run `npm test`.
- Run `npm run build`.
- Run `npm run harness:validate`.

## Completion Evidence

- `resetMockState()` is public and tested by `test/unit/ResetMockState.test.ts`.
- README documents `beforeEach(resetMockState)`.
