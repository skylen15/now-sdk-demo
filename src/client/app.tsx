import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@servicenow/react-components/Button'
import type { SelectItem } from '@servicenow/react-components/Select'
import { ConfirmModal } from './components/ConfirmModal'
import { TaskComposer } from './components/TaskComposer'
import { TaskFilters } from './components/TaskFilters'
import { TaskList } from './components/TaskList'
import { TodoState } from './components/TodoState'
import { createTask, deleteTask, listTags, listTaskTags, listTasks, TodoTask, updateTask } from './services/todo-api'
import { display, value } from './utils/fields'
import { defaultFilterState, filterTasks, isTaskCompleted, taskId, type TaskTagIndex, type TodoFilterState } from './utils/task-filters'

type PendingAction = { type: 'delete'; task: TodoTask } | { type: 'clear-completed' } | null

export default function App() {
    const queryClient = useQueryClient()
    const [pendingAction, setPendingAction] = useState<PendingAction>(null)
    const [filters, setFilters] = useState<TodoFilterState>(defaultFilterState)
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
    const [drafts, setDrafts] = useState<Record<string, string>>({})

    const refreshTasks = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ['todo-tasks'] })
    }, [queryClient])

    const tasksQuery = useQuery({ queryKey: ['todo-tasks'], queryFn: listTasks })
    const tagsQuery = useQuery({ queryKey: ['todo-tags'], queryFn: listTags })
    const taskTagsQuery = useQuery({ queryKey: ['todo-task-tags'], queryFn: listTaskTags })
    const tasks = tasksQuery.data || []
    const tags = tagsQuery.data || []
    const taskTags = taskTagsQuery.data || []
    const completedCount = useMemo(() => tasks.filter(isTaskCompleted).length, [tasks])
    const activeCount = tasks.length - completedCount
    const tagOptions = useMemo<SelectItem[]>(() => tags.map((tag) => ({
        id: value(tag.sys_id),
        label: display(tag.name),
    })).filter((tag) => tag.id && tag.label), [tags])
    const taskTagIndex = useMemo<TaskTagIndex>(() => {
        return taskTags.reduce<TaskTagIndex>((index, mapping) => {
            const task = value(mapping.task)
            const tag = value(mapping.tag)
            if (!task || !tag) return index
            index[task] = index[task] || new Set<string>()
            index[task].add(tag)
            return index
        }, {})
    }, [taskTags])
    const visibleTasks = useMemo(() => filterTasks(tasks, filters, taskTagIndex), [filters, taskTagIndex, tasks])

    const createMutation = useMutation({ mutationFn: createTask, onSuccess: refreshTasks })
    const updateMutation = useMutation({
        mutationFn: ({ task, completed, title }: { task: TodoTask; completed?: boolean; title?: string }) =>
            updateTask(taskId(task), {
                ...(typeof completed === 'boolean' ? { completed, status: completed ? 'completed' : 'active' } : {}),
                ...(typeof title === 'string' ? { title } : {}),
            }),
        onSuccess: refreshTasks,
    })
    const deleteMutation = useMutation({ mutationFn: deleteTask, onSuccess: refreshTasks })
    const clearCompletedMutation = useMutation({
        mutationFn: async () => {
            await Promise.all(tasks.filter(isTaskCompleted).map((task) => deleteTask(taskId(task))))
        },
        onSuccess: refreshTasks,
    })

    const busy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || clearCompletedMutation.isPending
    const isLoading = tasksQuery.isLoading || tagsQuery.isLoading || taskTagsQuery.isLoading
    const error = tasksQuery.error || tagsQuery.error || taskTagsQuery.error || createMutation.error || updateMutation.error || deleteMutation.error || clearCompletedMutation.error
    const errorMessage = error instanceof Error ? error.message : null

    const handleStartEdit = useCallback((task: TodoTask) => {
        const id = taskId(task)
        setEditingTaskId(id)
        setDrafts((current) => ({ ...current, [id]: current[id] ?? display(task.title) }))
    }, [])

    const handleDraftChange = useCallback((task: TodoTask, draft: string) => {
        const id = taskId(task)
        setDrafts((current) => ({ ...current, [id]: draft }))
    }, [])

    const handleCancelEdit = useCallback((task: TodoTask) => {
        const id = taskId(task)
        setEditingTaskId(null)
        setDrafts((current) => {
            const next = { ...current }
            delete next[id]
            return next
        })
    }, [])

    const handleSaveEdit = useCallback(async (task: TodoTask) => {
        const id = taskId(task)
        const title = (drafts[id] || '').trim()
        if (!title) return
        await updateMutation.mutateAsync({ task, title })
        setEditingTaskId(null)
        setDrafts((current) => {
            const next = { ...current }
            delete next[id]
            return next
        })
    }, [drafts, updateMutation])

    const handleConfirm = useCallback(() => {
        if (!pendingAction) return
        if (pendingAction.type === 'delete') {
            void deleteMutation.mutateAsync(taskId(pendingAction.task))
        } else {
            void clearCompletedMutation.mutateAsync()
        }
        setPendingAction(null)
    }, [clearCompletedMutation, deleteMutation, pendingAction])

    const modalContent = pendingAction?.type === 'delete'
        ? `Delete "${display(pendingAction.task.title)}"?`
        : 'Delete all completed tasks?'

    return (
        <main className="todo-shell">
            <section className="todo-panel" aria-label="Personal Todo">
                <header className="todo-header">
                    <div>
                        <h1>Personal Todo</h1>
                        <p>{activeCount} active / {completedCount} completed</p>
                    </div>
                    <Button
                        label="Clear completed"
                        variant="secondary-negative"
                        disabled={completedCount === 0 || busy}
                        onClicked={() => setPendingAction({ type: 'clear-completed' })}
                    />
                </header>
                <TaskComposer disabled={busy} onCreate={(title) => createMutation.mutateAsync(title)} />
                <TaskFilters filters={filters} tags={tagOptions} disabled={isLoading} onChange={setFilters} />
                <TodoState
                    errorMessage={errorMessage}
                    isEmpty={!isLoading && tasks.length === 0}
                    isLoading={isLoading}
                    hasNoResults={!isLoading && tasks.length > 0 && visibleTasks.length === 0}
                />
                {!isLoading && visibleTasks.length > 0 && (
                    <TaskList
                        tasks={visibleTasks}
                        busy={busy}
                        editingTaskId={editingTaskId}
                        drafts={drafts}
                        onStartEdit={handleStartEdit}
                        onDraftChange={handleDraftChange}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        onToggle={(task, completed) => updateMutation.mutateAsync({ task, completed })}
                        onDelete={(task) => setPendingAction({ type: 'delete', task })}
                    />
                )}
            </section>
            <ConfirmModal
                opened={pendingAction !== null}
                headerLabel="Confirm delete"
                content={modalContent}
                confirmLabel="Delete"
                onConfirm={handleConfirm}
                onCancel={() => setPendingAction(null)}
            />
        </main>
    )
}
