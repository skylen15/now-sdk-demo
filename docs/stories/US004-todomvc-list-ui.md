# US004 - TodoMVC List UI

## User Story

As an individual ServiceNow user, I want a fast TodoMVC-like React 18 list UI so that task capture and task scanning feel immediate inside ServiceNow.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 5. Experience Principles, 7. UX Model

## Scope

- Build the main React 18 app page/workspace-style todo interface.
- Add main task input.
- Add task list rows.
- Add empty, loading, error, no-results, completed, and overdue-ready states.
- Keep the first screen as the working app, not a landing page.

## Acceptance Criteria

- The first screen is the todo working interface.
- The main input is at the top of the task area.
- Task rows show checkbox, title, and row actions.
- Layout is dense, scannable, and native-feeling.
- Loading and error states do not cause major layout shift.
- Empty state prompts task creation without marketing content.
- Completed task styling is subdued and reversible.

## ServiceNow/Now SDK Notes

- Confirm the exact SDK-supported React UI artifact pattern before implementation.
- Use `now-sdk-explain` topics such as `ui-page-guide`, `ui-page-patterns-guide`, and `ui-page-theming-guide`.
- Put UI metadata under a type-specific folder such as `src/fluent/ui-pages/` when applicable.

## Out of Scope

- Advanced productivity metadata controls.
- Team navigation.
- Portal-first or marketing page design.

## Testing

```powershell
npm run build
```

- Local build test: verify the React UI page bundle and Fluent UI page metadata compile.
- React UI smoke test on the installed UI page: open the app page and confirm the first viewport is the working todo interface.
- React UI smoke test: verify loading, error, empty, no-results, completed, and normal task-row states do not cause major layout shift.
- ATF/application navigator test: verify the Personal Todo app menu/module is visible to users with the todo role.
