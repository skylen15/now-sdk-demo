import { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import { Button } from '@servicenow/react-components/Button'
import { Checkbox, type CheckboxCheckedSet } from '@servicenow/react-components/Checkbox'
import { Input, type InputEnterKeydown, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'
import { Select, type SelectItem, type SelectSelectedItemSet } from '@servicenow/react-components/Select'
import type { TodoTag, TodoTask, TodoTaskPatch, TodoTaskTag } from '../services/todo-api'
import { display, value } from '../utils/fields'
import {
    dueDateDisplay,
    dueDateInputValue,
    isTaskCompleted,
    isTaskOverdue,
    localDateEndAsServiceNowValue,
    type TaskPriority,
} from '../utils/task-filters'
import { isReminderDue, localDateTimeAsServiceNowValue, reminderDisplay, reminderInputValue } from '../utils/reminders'

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
    tags: TodoTag[]
    taskTags: TodoTaskTag[]
    onCreateTag: (name: string) => Promise<TodoTag>
    onAssignTag: (task: TodoTask, tag: string) => Promise<unknown>
    onRemoveTag: (mapping: TodoTaskTag) => Promise<unknown>
    onDelete: (task: TodoTask) => void
}

const priorityItems: SelectItem[] = [
    { id: 'low', label: 'Low' },
    { id: 'normal', label: 'Normal' },
    { id: 'high', label: 'High' },
    { id: 'urgent', label: 'Urgent' },
]

type RecurrenceKind = 'none' | 'daily' | 'weekly' | 'monthly' | 'weekdays'

function recurrenceKind(task: TodoTask): RecurrenceKind {
    try {
        return (JSON.parse(value(task.recurrence) || '{}').kind || 'none') as RecurrenceKind
    } catch {
        return 'none'
    }
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
    onUpdate,
    tags,
    taskTags,
    onCreateTag,
    onAssignTag,
    onRemoveTag,
    onDelete,
}: TaskRowProps) {
    const completed = isTaskCompleted(task)
    const overdue = isTaskOverdue(task)
    const title = display(task.title)
    const priority = (value(task.priority) || 'normal') as TaskPriority
    const dueDisplay = dueDateDisplay(task)
    const taskReminderDisplay = reminderDisplay(task)
    const reminderDue = isReminderDue(task)
    const [notes, setNotes] = useState(display(task.notes))
    const [tagName, setTagName] = useState('')
    const [recurrence, setRecurrence] = useState<RecurrenceKind>(() => recurrenceKind(task))
    const mappings = useMemo(() => taskTags.filter((mapping) => value(mapping.task) === value(task.sys_id)), [task.sys_id, taskTags])
    const assignedTags = useMemo(() => mappings.map((mapping) => ({
        mapping,
        tag: tags.find((tag) => value(tag.sys_id) === value(mapping.tag)),
    })).filter(({ tag }) => tag), [mappings, tags])

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

    const handleReminderChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        await onUpdate(task, { reminder_at: localDateTimeAsServiceNowValue(event.currentTarget.value) })
    }, [onUpdate, task])

    const addTag = useCallback(async () => {
        const name = tagName.trim()
        if (!name) return
        const tag = await onCreateTag(name)
        if (!mappings.some((mapping) => value(mapping.tag) === value(tag.sys_id))) {
            await onAssignTag(task, value(tag.sys_id))
        }
        setTagName('')
    }, [mappings, onAssignTag, onCreateTag, tagName, task])

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
                            {taskReminderDisplay && <span className={reminderDue ? 'todo-reminder todo-reminder--due' : 'todo-reminder'}>{reminderDue ? 'Reminder due' : 'Reminder'} {taskReminderDisplay}</span>}
                            {display(task.notes).trim() && <span title={display(task.notes)}>Has notes</span>}
                            {assignedTags.map(({ tag }) => <span className="todo-tag" key={value(tag!.sys_id)}>{display(tag!.name)}</span>)}
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
                <label>
                    <span>Reminder</span>
                    <input
                        type="datetime-local"
                        value={reminderInputValue(task)}
                        disabled={busy}
                        onChange={handleReminderChange}
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
            {isEditing && (
                <div className="todo-row__details">
                    <label>
                        <span>Notes</span>
                        <textarea value={notes} disabled={busy} onChange={(event) => setNotes(event.currentTarget.value)} />
                    </label>
                    <Button label="Save notes" variant="secondary" disabled={busy} onClicked={() => onUpdate(task, { notes })} />
                    <label>
                        <span>Add tag</span>
                        <input value={tagName} disabled={busy} onChange={(event) => setTagName(event.currentTarget.value)} />
                    </label>
                    <Button label="Add tag" variant="secondary" disabled={busy || !tagName.trim()} onClicked={addTag} />
                    <label>
                        <span>Recurrence</span>
                        <select value={recurrence} disabled={busy} onChange={(event) => setRecurrence(event.currentTarget.value as RecurrenceKind)}>
                            <option value="none">None</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekdays">Weekdays</option>
                        </select>
                    </label>
                    <Button label="Save recurrence" variant="secondary" disabled={busy} onClicked={() => onUpdate(task, { recurrence: recurrence === 'none' ? '' : JSON.stringify({ kind: recurrence }) })} />
                    {assignedTags.map(({ mapping, tag }) => (
                        <Button key={value(mapping.sys_id)} label={`Remove ${display(tag!.name)}`} variant="tertiary" disabled={busy} onClicked={() => onRemoveTag(mapping)} />
                    ))}
                </div>
            )}
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
