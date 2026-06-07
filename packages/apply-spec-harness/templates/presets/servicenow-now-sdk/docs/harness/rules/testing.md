# Testing Rules

- Run `npm run build` after Fluent or client changes when feasible.
- Every story must map acceptance criteria to validation scenarios.
- Security changes require negative cross-user access tests.
- Data model and server behavior should be validated through ATF, server-side checks, or Table API tests.
- UI stories require installed UI page smoke tests when instance validation is in scope.
- Record known test gaps in `state.md` or the active story notes.

