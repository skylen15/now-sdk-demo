import type { ServiceNowField } from '../utils/fields'

export interface TodoTask {
    sys_id: ServiceNowField
    title: ServiceNowField
    completed: ServiceNowField
    status: ServiceNowField
    priority: ServiceNowField
    due_at: ServiceNowField
    notes: ServiceNowField
    completed_at: ServiceNowField
    sys_updated_on: ServiceNowField
}

export interface TodoTaskPatch {
    title?: string
    completed?: boolean
    status?: 'active' | 'completed'
}

export interface TodoTag {
    sys_id: ServiceNowField
    name: ServiceNowField
    normalized_name: ServiceNowField
}

export interface TodoTaskTag {
    sys_id: ServiceNowField
    task: ServiceNowField
    tag: ServiceNowField
}

const taskTableUrl = '/api/now/table/x_2063979_todo_task'
const tagTableUrl = '/api/now/table/x_2063979_todo_tag'
const taskTagTableUrl = '/api/now/table/x_2063979_todo_task_tag'
const taskFields = 'sys_id,title,completed,status,priority,due_at,notes,completed_at,sys_updated_on'
const tagFields = 'sys_id,name,normalized_name'
const taskTagFields = 'sys_id,task,tag'

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        ...init,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserToken': (window as Window & { g_ck?: string }).g_ck || '',
            ...init.headers,
        },
    })

    if (!response.ok) {
        const body = await response.json().catch(() => null)
        const message = body?.error?.message || `Todo request failed: ${response.status}`
        throw new Error(message)
    }

    if (response.status === 204) return undefined as T
    return response.json() as Promise<T>
}

export async function listTasks(): Promise<TodoTask[]> {
    const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_fields: taskFields,
        sysparm_query: 'ORDERBYcompleted^ORDERBYDESCsys_updated_on',
    })
    const data = await request<{ result: TodoTask[] }>(`${taskTableUrl}?${params}`)
    return data.result || []
}

export async function listTags(): Promise<TodoTag[]> {
    const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_fields: tagFields,
        sysparm_query: 'ORDERBYname',
    })
    const data = await request<{ result: TodoTag[] }>(`${tagTableUrl}?${params}`)
    return data.result || []
}

export async function listTaskTags(): Promise<TodoTaskTag[]> {
    const params = new URLSearchParams({
        sysparm_display_value: 'all',
        sysparm_fields: taskTagFields,
        sysparm_query: 'ORDERBYtag',
    })
    const data = await request<{ result: TodoTaskTag[] }>(`${taskTagTableUrl}?${params}`)
    return data.result || []
}

export async function createTask(title: string): Promise<TodoTask> {
    const data = await request<{ result: TodoTask }>(`${taskTableUrl}?sysparm_display_value=all`, {
        method: 'POST',
        body: JSON.stringify({ title }),
    })
    return data.result
}

export async function updateTask(sysId: string, changes: TodoTaskPatch): Promise<TodoTask> {
    const data = await request<{ result: TodoTask }>(`${taskTableUrl}/${sysId}?sysparm_display_value=all`, {
        method: 'PATCH',
        body: JSON.stringify(changes),
    })
    return data.result
}

export async function deleteTask(sysId: string): Promise<void> {
    await request<void>(`${taskTableUrl}/${sysId}`, { method: 'DELETE' })
}
