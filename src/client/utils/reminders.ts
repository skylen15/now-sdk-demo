import type { TodoTask } from '../services/todo-api'
import { value } from './fields'
import { parseServiceNowDateTime } from './due-dates'
import { localDateTimeInputValue } from './reminder-dates'

export { localDateTimeAsServiceNowValue } from './reminder-dates'

export function reminderInputValue(task: TodoTask): string {
    const date = parseServiceNowDateTime(value(task.reminder_at))
    if (!date) return ''
    return localDateTimeInputValue(date)
}

export function reminderDisplay(task: TodoTask): string {
    const date = parseServiceNowDateTime(value(task.reminder_at))
    if (!date) return ''
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

export function isReminderDue(task: TodoTask, now = new Date()): boolean {
    const date = parseServiceNowDateTime(value(task.reminder_at))
    return Boolean(date && date <= now)
}
