# US010 - Reminders

## User Story

As an individual ServiceNow user, I want lightweight task reminders so that important personal tasks can surface at the right time.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.11 Lightweight Reminders, 8.5 Reminder/Recurrence Support

## Scope

- Set optional reminder date/time.
- Change or clear reminder date/time.
- Display reminder state in task rows or details.
- Choose and implement a lightweight reminder delivery mechanism.

## Acceptance Criteria

- Reminder is optional.
- Reminder can be set independently of due date.
- Reminder can be changed or cleared.
- Reminder state is visible in the task row or details panel.
- Delivery mechanism is validated before implementation: in-app notification, ServiceNow event/notification, or both.
- The implementation does not become a custom full notification engine.

## ServiceNow/Now SDK Notes

- Validate ServiceNow notification/event options against `repos/servicenow-docs`.
- Define reminder metadata under the appropriate Fluent artifact type folders.
- Keep reminders personal-user scoped.

## Out of Scope

- Team notification routing.
- Escalation policies.
- External calendar or email sync beyond standard ServiceNow notification behavior.

## Testing

```powershell
npm run build
```

- Local build test: verify reminder metadata, client code, and selected delivery artifacts compile.
- ATF/server test: set, update, clear, and validate reminder records or fields.
- ATF/server, event, or notification test: trigger a reminder using the selected delivery mechanism and validate the expected in-app notification, ServiceNow event, or notification record.
- React UI smoke test on the installed UI page: set, update, clear, and verify visible reminder state.
