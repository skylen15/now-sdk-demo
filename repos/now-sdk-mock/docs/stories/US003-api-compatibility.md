# US003 - Define Supported ServiceNow API Compatibility

**Status:** Complete

## Summary

Make the mock library's supported, simplified, and stubbed ServiceNow behavior explicit.

## Acceptance Criteria

- Public mock APIs are inventoried from exports and implementation.
- A compatibility reference distinguishes supported, simplified, and stubbed behavior.
- Important documented behavior links to focused tests.
- Newly identified high-risk gaps are added to the backlog rather than implied to work.

## Testing

- Run tests associated with documented compatibility claims.
- Run `npm test`.
- Run `npm run harness:validate`.

## Completion Evidence

- `docs/compatibility.md` classifies public behavior and links focused tests.
- GlideQuery platform-only contracts are deterministic and directly tested.
