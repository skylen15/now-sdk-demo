# US008 - Saved Filters

## User Story

As an individual ServiceNow user, I want to save named task views so that I can return quickly to the filters I use most often.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.9 Saved Filters, 7.3 Core Flows

## Scope

- Save a filter/search/sort combination as a named view.
- Show saved filters in navigation.
- Select a saved filter.
- Rename saved filters.
- Delete saved filters.
- Load a sensible default view when no saved filter is selected.

## Acceptance Criteria

- A saved filter belongs to the current user.
- Saved filters can include status, due date bucket, priority, tags, search text, and sort order.
- Users can rename saved filters.
- Users can delete saved filters.
- Selecting a saved filter updates the visible list.
- The app loads a default view when no saved filter is selected.
- Team/shared saved filters are not introduced.

## ServiceNow/Now SDK Notes

- Store structured UI state rather than arbitrary query text unless a later decision explicitly allows query syntax.
- Keep saved filter records owner-only.

## Out of Scope

- Shared/team filters.
- Complex query builder.
- Dashboard widgets.

## Testing

```powershell
npm run build
```

- Local build test: verify saved-filter client and metadata changes compile.
- ATF/server or REST test: create, read, update, and delete saved filter records and validate they are owner-scoped.
- ATF/server test: validate saved filter state is structured data, not arbitrary query text.
- React UI smoke test on the installed UI page: save, select, rename, and delete a filter that combines status, due bucket, priority, tags, search, and sorting.
