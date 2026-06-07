# Testing Rules

- Run `npm run build` after Fluent or client changes when feasible.
- Every story must map acceptance criteria to validation scenarios.
- Security changes require negative cross-user access tests.
- Server-side script behavior must be tested locally with `@kobidev/now-sdk-mock` first when feasible.
- Use ATF as the later fallback for server-side behavior that cannot be mocked locally or requires instance/platform enforcement.
- Data model behavior should be validated through local server-side checks, ATF, or Table API tests as appropriate to the risk.
- UI Page stories require Playwright checks when feasible and installed UI page smoke tests when instance validation is in scope.
- Use cloned package sources under `repos/now-sdk-mock` and `repos/playwright` for examples and API details before relying on memory.
- Record known test gaps in `state.md` or the active story notes.
