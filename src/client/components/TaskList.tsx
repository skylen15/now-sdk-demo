import type { TodoTask } from '../services/todo-api'
import { TaskRow } from './TaskRow'

interface TaskListProps {
    tasks: TodoTask[]
    busy: boolean
    editingTaskId: string | null
    drafts: Record<string, string>
    onStartEdit: (task: TodoTask) => void
    onDraftChange: (task: TodoTask, draft: string) => void
    onCancelEdit: (task: TodoTask) => void
    onSaveEdit: (task: TodoTask) => Promise<unknown>
    onToggle: (task: TodoTask, completed: boolean) => Promise<unknown>
    onDelete: (task: TodoTask) => void
}

export function TaskList({
    tasks,
    busy,
    editingTaskId,
    drafts,
    onStartEdit,
    onDraftChange,
    onCancelEdit,
    onSaveEdit,
    onToggle,
    onDelete,
}: TaskListProps) {
    return (
        <ul className="todo-list" aria-label="Todo tasks">
            {tasks.map((task) => (
                <TaskRow
                    key={typeof task.sys_id === 'string' ? task.sys_id : task.sys_id?.value}
                    task={task}
                    busy={busy}
                    isEditing={(typeof task.sys_id === 'string' ? task.sys_id : task.sys_id?.value || '') === editingTaskId}
                    draft={drafts[typeof task.sys_id === 'string' ? task.sys_id : task.sys_id?.value || ''] || ''}
                    onStartEdit={onStartEdit}
                    onDraftChange={onDraftChange}
                    onCancelEdit={onCancelEdit}
                    onSaveEdit={onSaveEdit}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}
