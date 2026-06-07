import { useCallback, type ChangeEvent } from 'react'
import { Button } from '@servicenow/react-components/Button'
import { Checkbox, type CheckboxCheckedSet } from '@servicenow/react-components/Checkbox'
import { Input, type InputEnterKeydown, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'
import { Select, type SelectItem, type SelectSelectedItemSet } from '@servicenow/react-components/Select'
import type { TodoTask, TodoTaskPatch } from '../services/todo-api'
import { display, value } from '../utils/fields'
import {
    dueDateDisplay,
    dueDateInputValue,
    isTaskCompleted,
    isTaskOverdue,
    localDateEndAsServiceNowValue,
    type TaskPriority,
} from '../utils/task-filters'

interface TaskRowProps {
    task: TodoTask
    busy: boolean
    isEditing: boolean
    draft: string
    onStartEdit: (task: TodoTask) => void
    onDraftChange: (task: TodoTask, draft: string) => void
    onCancelEdit: (task: TodoTask) => void
    onSaveEdit: (task: TodoTask) => Promise<unknown>
    onToggle: (task: TodoTask, completed: boolean) => Promise<unknown>
    onUpdate: (task: TodoTask, changes: TodoTaskPatch) => Promise<unknown>
    onDelete: (task: TodoTask) => void
}

const priorityItems: SelectItem[] = [
    { id: 'low', label: 'Low' },
    { id: 'normal', label: 'Normal' },
    { id: 'high', label: 'High' },
    { id: 'urgent', label: 'Urgent' },
]

export function TaskRow({
    task,
    busy,
    isEditing,
    draft,
    onStartEdit,
    onDraftChange,
    onCancelEdit,
    onSaveEdit,
    onToggle,
    onUpdate,
    onDelete,
}: TaskRowProps) {
    const completed = isTaskCompleted(task)
    const overdue = isTaskOverdue(task)
    const title = display(task.title)
    const priority = (value(task.priority) || 'normal') as TaskPriority
    const dueDisplay = dueDateDisplay(task)

    const handleCheckedSet = useCallback<CheckboxCheckedSet>(async (event) => {
        await onToggle(task, event.detail.payload.value)
    }, [onToggle, task])

    const handleInput = useCallback<InputInput>((event) => {
        onDraftChange(task, event.detail.payload.fieldValue)
    }, [onDraftChange, task])

    const handleValueSet = useCallback<InputValueSet>((event) => {
        onDraftChange(task, event.detail.payload.value)
    }, [onDraftChange, task])

    const save = useCallback(async () => {
        await onSaveEdit(task)
    }, [onSaveEdit, task])

    const handleEnter = useCallback<InputEnterKeydown>(async () => {
        await save()
    }, [save])

    const handlePriorityChange = useCallback<SelectSelectedItemSet>(async (event) => {
        await onUpdate(task, { priority: String(event.detail.payload.value) as TaskPriority })
    }, [onUpdate, task])

    const handleDueChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        await onUpdate(task, { due_at: localDateEndAsServiceNowValue(event.currentTarget.value) })
    }, [onUpdate, task])

    return (
        <li className={`todo-row ${completed ? 'todo-row--completed' : ''} ${overdue ? 'todo-row--overdue' : ''}`}>
            <Checkbox
                checked={completed}
                manageChecked
                disabled={busy}
                onCheckedSet={handleCheckedSet}
                configAria={{ checkbox: { 'aria-label': `Toggle ${title}` } }}
            />
            <div className="todo-row__content">
                {isEditing ? (
                    <Input
                        label="Task title"
                        value={draft}
                        manageValue
                        required
                        disabled={busy}
                        onInput={handleInput}
                        onValueSet={handleValueSet}
                        onEnterKeydown={handleEnter}
                    />
                ) : (
                    <>
                        <span className="todo-row__title" onDoubleClick={() => onStartEdit(task)}>
                            {title}
                        </span>
                        <span className="todo-row__meta">
                            <span className={`todo-priority todo-priority--${priority}`}>{display(task.priority) || 'Normal'}</span>
                            {dueDisplay && <span>{overdue ? 'Overdue' : 'Due'} {dueDisplay}</span>}
                        </span>
                    </>
                )}
            </div>
            <div className="todo-row__schedule">
                <label>
                    <span>Due date</span>
                    <input
                        type="date"
                        value={dueDateInputValue(task)}
                        disabled={busy}
                        onChange={handleDueChange}
                    />
                </label>
                <Select
                    label="Priority"
                    items={priorityItems}
                    selectedItem={priority}
                    manageSelectedItem
                    disabled={busy}
                    onSelectedItemSet={handlePriorityChange}
                />
            </div>
            <div className="todo-row__actions">
                {isEditing ? (
                    <>
                        <Button label="Save" variant="primary" disabled={busy || !draft.trim()} onClicked={save} />
                        <Button label="Cancel" variant="secondary" disabled={busy} onClicked={() => onCancelEdit(task)} />
                    </>
                ) : (
                    <Button label="Edit" variant="secondary" disabled={busy} onClicked={() => onStartEdit(task)} />
                )}
                <Button label="Delete" variant="primary-negative" disabled={busy} onClicked={() => onDelete(task)} />
            </div>
        </li>
    )
}
