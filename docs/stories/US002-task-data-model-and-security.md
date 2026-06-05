# US002 - Task Data Model and Security

## User Story

As an individual ServiceNow user, I want my todo data to be private to me so that my personal tasks, tags, and saved filters are not visible to other normal users.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 8. Data Concepts, 9. Security and Access

## Scope

- Define scoped metadata for personal tasks.
- Define scoped metadata for tags.
- Define scoped metadata for task-tag mappings.
- Define scoped metadata for saved filters.
- Define owner-only access rules for normal users.

## Acceptance Criteria

- A personal task concept exists with owner, title, status, priority, due date, notes, reminder, recurrence, and completion fields or equivalent.
- A tag concept exists with owner, name, and normalized name fields or equivalent.
- A task-tag mapping concept exists.
- A saved filter concept exists with owner, name, and structured filter state.
- Normal users can read, create, update, and delete only their own todo records.
- Admin/developer support access does not weaken normal user isolation.
- Team/workgroup sharing is not introduced.

## ServiceNow/Now SDK Notes

- Define metadata under type-specific folders such as `src/fluent/tables/`, `src/fluent/acls/`, and `src/fluent/roles/`.
- Validate exact Table, Column, Role, and ACL APIs with `now-sdk-explain` before implementation.
- Use `repos/servicenow-docs` for ServiceNow platform behavior where needed.

## Out of Scope

- React UI.
- Reminder delivery.
- Recurrence generation logic.
- Team permissions.

## Testing

```powershell
npm run build
```

- Local build test: verify Fluent table, role, and ACL metadata compile.
- ATF/server test: create or impersonate at least two normal users and validate one user cannot read, update, or delete another user's task, tag, task-tag, or saved-filter records.
- ATF/server or REST test: validate admin/developer support access does not weaken normal user isolation.
- React UI smoke test is not required for this data/security story unless UI behavior is added in the implementation.
