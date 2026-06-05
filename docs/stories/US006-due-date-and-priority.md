# US006 - Due Date and Priority

## User Story

As an individual ServiceNow user, I want to assign due dates and priorities to tasks so that I can focus on urgent and time-sensitive work.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.5 Due Dates, 6.6 Priority

## Scope

- Add optional due date editing.
- Add priority values: low, normal, high, urgent.
- Display due date and priority in task rows.
- Support sorting or grouping by due date and priority.
- Visually distinguish overdue active tasks.

## Acceptance Criteria

- Due date is optional and can be set, changed, or cleared.
- Normal is the default priority.
- Priority can be changed from the task row or details panel.
- Tasks can be grouped or sorted by due date.
- Sorting can prioritize urgent and high tasks.
- Overdue active tasks are visually distinguishable.
- Completed tasks do not appear as overdue.
- Priority styling is visible but restrained.

## ServiceNow/Now SDK Notes

- Validate date storage and timezone display behavior against Australia ServiceNow docs before finalizing implementation.
- Keep field choices aligned with the data model from US002.

## Out of Scope

- Reminder notification delivery.
- Calendar sync.
- Team SLA or assignment priority.

## Testing

```powershell
npm run build
```

- Local build test: verify due date, priority, and Fluent choice changes compile.
- ATF/REST test: create or update tasks with no date, today, future, overdue, and completed-overdue cases; validate stored due date and priority values server-side.
- React UI smoke test on the installed UI page: set, change, and clear due dates; change priority between low, normal, high, and urgent.
- React UI smoke test: verify due-date and priority sorting, restrained priority styling, overdue styling for active tasks, and no overdue styling for completed tasks.
