import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_2063979_todo_task',
    view: default_view,
    columns: [
        'completed',
        'completed_at',
        'due_at',
        'notes',
        'owner',
        'priority',
        'recurrence',
        'recurrence_source',
        'reminder_at',
        'status',
    ],
})
