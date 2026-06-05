# US007 - Tags and Notes

## User Story

As an individual ServiceNow user, I want to tag tasks and add notes so that I can organize related work and capture useful context.

## Source

- PRD: `docs/servicenow-personal-todo-prd.md`
- Sections: 6.7 Tags, 6.8 Notes

## Scope

- Add user-scoped tags.
- Add task-tag assignment and removal.
- Add optional notes.
- Indicate notes on task rows.
- Include notes in search.

## Acceptance Criteria

- Tags are scoped to the current user.
- Duplicate tags are normalized for the same user.
- Tags can be added from the task editor.
- Removing a tag from one task does not delete it from other tasks.
- Notes are optional.
- Task rows indicate when notes exist.
- Notes can be edited without changing the task title.
- Search includes notes.

## ServiceNow/Now SDK Notes

- Use the tag and mapping metadata from US002.
- Preserve owner-only access for tags and mappings.
- Decide whether notes are stored directly on the task table or in a related record before implementation.

## Out of Scope

- Shared tags.
- Comments/activity streams.
- Attachments.

## Testing

```powershell
npm run build
```

- Local build test: verify tag/note client and metadata changes compile.
- ATF/server or REST test: create duplicate-case tags for the same user and validate normalization prevents duplicate logical tags.
- ATF/server or REST test: assign tags to multiple tasks, remove one assignment, and validate the tag remains available for other tasks.
- React UI smoke test on the installed UI page: add tags, remove one assignment, edit notes without changing the title, and verify notes are included in search.
