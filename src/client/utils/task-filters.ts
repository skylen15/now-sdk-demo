import type { TodoTask } from '../services/todo-api'
import { display, value } from './fields'

export type StatusFilter = 'all' | 'active' | 'completed'
export type DueFilter = 'any' | 'today' | 'upcoming' | 'overdue'
export type PriorityFilter = 'any' | 'low' | 'normal' | 'high' | 'urgent'

export interface TodoFilterState {
    status: StatusFilter
    due: DueFilter
    priority: PriorityFilter
    tag: string
    search: string
}

export type TaskTagIndex = Record<string, Set<string>>

export const anyTagFilter = 'any'

export const defaultFilterState: TodoFilterState = {
    status: 'all',
    due: 'any',
    priority: 'any',
    tag: anyTagFilter,
    search: '',
}

export function isTaskCompleted(task: TodoTask): boolean {
    const completed = value(task.completed).toLowerCase()
    return completed === 'true' || completed === '1' || completed === 'yes'
}

export function taskId(task: TodoTask): string {
    return value(task.sys_id)
}

export function localDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function parseServiceNowDateTime(raw: string): Date | null {
    if (!raw) return null
    const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw)
        ? raw.replace(' ', 'T') + 'Z'
        : raw
    const date = new Date(normalized)
    return Number.isNaN(date.getTime()) ? null : date
}

function dueDateKey(task: TodoTask): string {
    const actualDate = parseServiceNowDateTime(value(task.due_at))
    if (actualDate) return localDateKey(actualDate)

    const displayDate = display(task.due_at).match(/\d{4}-\d{2}-\d{2}/)?.[0]
    return displayDate || ''
}

function matchesStatus(task: TodoTask, status: StatusFilter): boolean {
    if (status === 'all') return true
    const completed = isTaskCompleted(task)
    return status === 'completed' ? completed : !completed
}

function matchesDue(task: TodoTask, due: DueFilter, todayKey: string): boolean {
    if (due === 'any') return true

    const taskDueKey = dueDateKey(task)
    if (!taskDueKey) return false

    if (due === 'overdue') return taskDueKey < todayKey && !isTaskCompleted(task)
    if (due === 'today') return taskDueKey === todayKey
    return taskDueKey > todayKey
}

function matchesPriority(task: TodoTask, priority: PriorityFilter): boolean {
    return priority === 'any' || value(task.priority) === priority
}

function matchesTag(task: TodoTask, tag: string, taskTagIndex: TaskTagIndex): boolean {
    return tag === anyTagFilter || Boolean(taskTagIndex[taskId(task)]?.has(tag))
}

function matchesSearch(task: TodoTask, search: string): boolean {
    const needle = search.trim().toLowerCase()
    if (!needle) return true
    return `${display(task.title)} ${display(task.notes)}`.toLowerCase().includes(needle)
}

export function filterTasks(tasks: TodoTask[], filters: TodoFilterState, taskTagIndex: TaskTagIndex): TodoTask[] {
    const todayKey = localDateKey(new Date())
    return tasks.filter((task) =>
        matchesStatus(task, filters.status) &&
        matchesDue(task, filters.due, todayKey) &&
        matchesPriority(task, filters.priority) &&
        matchesTag(task, filters.tag, taskTagIndex) &&
        matchesSearch(task, filters.search)
    )
}
