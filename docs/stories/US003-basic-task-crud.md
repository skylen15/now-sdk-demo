# US003 - Basic Task CRUD

## User Story

As an individual ServiceNow user, I want to create, edit, complete, reactivate, and delete personal tasks so that I can manage a simple todo list inside ServiceNow.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.1 Task Capture, 6.2 TodoMVC Core Actions, 7.3 Core Flows

## Scope

- Create a task with a required title.
- Edit task title.
- Mark task complete.
- Reactivate completed task.
- Delete a task.
- Clear completed tasks.

## Acceptance Criteria

- Empty titles cannot be saved.
- Leading and trailing whitespace is trimmed.
- New tasks default to active, normal priority, no due date, no tags, and owner equal to the current user.
- A checkbox toggles complete and incomplete states.
- Completion records a completion timestamp.
- Reactivating a task clears or updates completion state consistently.
- Inline title editing supports save and cancel behavior.
- Delete uses a clear destructive action.
- Clear completed is available only when completed tasks exist.

## ServiceNow/Now SDK Notes

- CRUD can be implemented through the selected ServiceNow-native API pattern after US002 exists.
- Keep ownership enforcement on the server/platform side, not only in the UI.

## Out of Scope

- Due dates.
- Tags.
- Notes.
- Saved filters.
- Recurrence.
- Reminders.

## Testing

```powershell
npm run build
```

- Local build test: verify client and Fluent changes compile.
- ATF/REST test: create, read, update, complete, reactivate, and delete tasks through the Table API, then validate resulting records server-side.
- ATF/server test: validate title trimming, default owner, default normal priority, active status, completion timestamp behavior, and clear-completed deletion behavior.
- React UI smoke test on the installed UI page: create, edit, complete, reactivate, delete, and clear completed tasks as the same user.
