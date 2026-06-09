import type { TodoTag, TodoTask, TodoTaskPatch, TodoTaskTag } from '../services/todo-api'
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
    onUpdate: (task: TodoTask, changes: TodoTaskPatch) => Promise<unknown>
    tags: TodoTag[]
    taskTags: TodoTaskTag[]
    onCreateTag: (name: string) => Promise<TodoTag>
    onAssignTag: (task: TodoTask, tag: string) => Promise<unknown>
    onRemoveTag: (mapping: TodoTaskTag) => Promise<unknown>
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
    onUpdate,
    tags,
    taskTags,
    onCreateTag,
    onAssignTag,
    onRemoveTag,
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
                    onUpdate={onUpdate}
                    tags={tags}
                    taskTags={taskTags}
                    onCreateTag={onCreateTag}
                    onAssignTag={onAssignTag}
                    onRemoveTag={onRemoveTag}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}
