import type { TodoTask } from '../services/todo-api'
import { display, value } from './fields'
import { localDateEndAsServiceNowValue, localDateKey, parseServiceNowDateTime } from './due-dates'

export { localDateEndAsServiceNowValue } from './due-dates'

export type StatusFilter = 'all' | 'active' | 'completed'
export type DueFilter = 'any' | 'today' | 'upcoming' | 'overdue'
export type PriorityFilter = 'any' | 'low' | 'normal' | 'high' | 'urgent'
export type TaskPriority = Exclude<PriorityFilter, 'any'>
export type SortMode = 'updated' | 'due' | 'priority'

export interface TodoFilterState {
    status: StatusFilter
    due: DueFilter
    priority: PriorityFilter
    tag: string
    search: string
    sort: SortMode
}

export type TaskTagIndex = Record<string, Set<string>>

export const anyTagFilter = 'any'

export const defaultFilterState: TodoFilterState = {
    status: 'all',
    due: 'any',
    priority: 'any',
    tag: anyTagFilter,
    search: '',
    sort: 'updated',
}

export function isTaskCompleted(task: TodoTask): boolean {
    const completed = value(task.completed).toLowerCase()
    return completed === 'true' || completed === '1' || completed === 'yes'
}

export function taskId(task: TodoTask): string {
    return value(task.sys_id)
}

export function dueDateKey(task: TodoTask): string {
    const actualDate = parseServiceNowDateTime(value(task.due_at))
    if (actualDate) return localDateKey(actualDate)

    const displayDate = display(task.due_at).match(/\d{4}-\d{2}-\d{2}/)?.[0]
    return displayDate || ''
}

export function isTaskOverdue(task: TodoTask, todayKey = localDateKey(new Date())): boolean {
    const taskDueKey = dueDateKey(task)
    return Boolean(taskDueKey && taskDueKey < todayKey && !isTaskCompleted(task))
}

export function dueDateInputValue(task: TodoTask): string {
    return dueDateKey(task)
}

export function dueDateDisplay(task: TodoTask): string {
    const actualDate = parseServiceNowDateTime(value(task.due_at))
    if (actualDate) return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(actualDate)
    return display(task.due_at)
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

const priorityRank: Record<TaskPriority, number> = {
    urgent: 0,
    high: 1,
    normal: 2,
    low: 3,
}

function sortTasks(tasks: TodoTask[], sort: SortMode): TodoTask[] {
    if (sort === 'updated') return tasks

    return tasks.map((task, index) => ({ task, index })).sort((left, right) => {
        if (sort === 'priority') {
            const leftRank = priorityRank[value(left.task.priority) as TaskPriority] ?? priorityRank.normal
            const rightRank = priorityRank[value(right.task.priority) as TaskPriority] ?? priorityRank.normal
            return leftRank - rightRank || left.index - right.index
        }

        const leftDue = dueDateKey(left.task) || '9999-12-31'
        const rightDue = dueDateKey(right.task) || '9999-12-31'
        return leftDue.localeCompare(rightDue) || left.index - right.index
    }).map(({ task }) => task)
}

export function filterTasks(tasks: TodoTask[], filters: TodoFilterState, taskTagIndex: TaskTagIndex): TodoTask[] {
    const todayKey = localDateKey(new Date())
    const filtered = tasks.filter((task) =>
        matchesStatus(task, filters.status) &&
        matchesDue(task, filters.due, todayKey) &&
        matchesPriority(task, filters.priority) &&
        matchesTag(task, filters.tag, taskTagIndex) &&
        matchesSearch(task, filters.search)
    )
    return sortTasks(filtered, filters.sort)
}
