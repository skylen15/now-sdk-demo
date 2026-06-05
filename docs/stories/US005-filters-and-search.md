# US005 - Filters and Search

## User Story

As an individual ServiceNow user, I want to filter and search my personal tasks so that I can quickly find active, completed, due, overdue, priority, or tagged work.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.3 Filters, 6.4 Search

## Scope

- Add core filters: all, active, completed.
- Add due bucket filters: today, upcoming, overdue.
- Add priority filter.
- Add tag filter once tags exist.
- Add title and notes search.
- Show active and completed counts.

## Acceptance Criteria

- Filter state updates the visible list without losing unsaved input text.
- Counts are visible for active and completed tasks.
- Overdue excludes completed tasks.
- Today uses the user's local date interpretation in the UI and stores dates consistently in the backend.
- Search applies together with the selected filter.
- Search results update without a full page reload.
- Empty search returns the normal filtered list.
- Search is case-insensitive.

## ServiceNow/Now SDK Notes

- Keep filter state structured so it can later be saved by US008.
- Confirm timezone/date behavior with ServiceNow docs before final date filtering implementation.

## Out of Scope

- Saved filter persistence.
- Calendar view.
- Team/shared filters.

## Testing

```powershell
npm run build
```

- Local build test: verify filter/search client code and route generation compile.
- ATF/server or REST setup test: create tasks across active, completed, due today, upcoming, overdue, priority, tagged, and notes-containing cases.
- React UI smoke test on the installed UI page: verify all/active/completed/today/upcoming/overdue filters, priority filtering, and case-insensitive title/notes search.
- React UI smoke test: verify search composes with the selected filter, empty search restores the normal filtered list, counts remain visible, and unsaved input text is not lost.
