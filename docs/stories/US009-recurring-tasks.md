# US009 - Recurring Tasks

## User Story

As an individual ServiceNow user, I want tasks to recur on a simple schedule so that repeated personal routines can be tracked without recreating them manually.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.10 Recurring Tasks, 8.5 Reminder/Recurrence Support

## Scope

- Configure recurrence for daily, weekly, monthly, or selected weekdays.
- Complete a recurring task and create or schedule the next occurrence.
- Stop recurrence.
- Edit recurrence configuration.
- Preserve relationship between generated occurrences and the recurring source.

## Acceptance Criteria

- Recurrence is optional.
- Completing a recurring task creates or schedules the next occurrence according to the recurrence rule.
- Users can stop recurrence.
- The original recurrence configuration remains editable.
- Generated occurrences preserve enough reference data to trace back to the recurrence source.
- Timezone/date behavior is validated before final implementation.

## ServiceNow/Now SDK Notes

- Decide whether recurrence stores rules as structured JSON, separate records, or encoded platform fields.
- Validate ServiceNow date/time behavior and any scheduled processing pattern against `repos/servicenow-docs`.
- Keep recurrence personal-user scoped.

## Out of Scope

- Shared recurring team tasks.
- Complex RRULE support.
- Calendar synchronization.

## Testing

```powershell
npm run build
```

- Local build test: verify recurrence metadata and server logic compile.
- ATF/server test: configure daily, weekly, monthly, and selected-weekday recurrence rules, complete tasks, and validate next occurrence records are created or scheduled correctly.
- ATF/server test: validate generated occurrences preserve reference data to the recurrence source and remain scoped to the owner.
- React UI smoke test on the installed UI page: configure, edit, stop, and complete recurring tasks, then verify visible next occurrence behavior.
