import { useCallback } from 'react'
import { Button } from '@servicenow/react-components/Button'
import { Checkbox, type CheckboxCheckedSet } from '@servicenow/react-components/Checkbox'
import { Input, type InputEnterKeydown, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'
import type { TodoTask } from '../services/todo-api'
import { display } from '../utils/fields'
import { isTaskCompleted } from '../utils/task-filters'

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
    onDelete: (task: TodoTask) => void
}

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
    onDelete,
}: TaskRowProps) {
    const completed = isTaskCompleted(task)
    const title = display(task.title)

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

    return (
        <li className={`todo-row ${completed ? 'todo-row--completed' : ''}`}>
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
                    <span className="todo-row__title" onDoubleClick={() => onStartEdit(task)}>
                        {title}
                    </span>
                )}
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
