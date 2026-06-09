import { useState } from 'react'
import { Button } from '@servicenow/react-components/Button'
import { Input, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'
import { Select, type SelectItem, type SelectSelectedItemSet } from '@servicenow/react-components/Select'
import type { TodoSavedFilter } from '../services/todo-api'
import { display, value } from '../utils/fields'

interface Props {
    savedFilters: TodoSavedFilter[]; selectedId: string; disabled: boolean
    onSelect: (id: string) => void; onSave: (name: string) => Promise<unknown>
    onRename: (id: string, name: string) => Promise<unknown>; onDelete: (id: string) => Promise<unknown>
}

export function SavedFilters({ savedFilters, selectedId, disabled, onSelect, onSave, onRename, onDelete }: Props) {
    const [name, setName] = useState('')
    const selected = savedFilters.find((filter) => value(filter.sys_id) === selectedId)
    const items: SelectItem[] = [{ id: '', label: 'Default view' }, ...savedFilters.map((filter) => ({ id: value(filter.sys_id), label: display(filter.name) }))]
    const onInput: InputInput = (event) => setName(event.detail.payload.fieldValue)
    const onValueSet: InputValueSet = (event) => setName(event.detail.payload.value)
    const onSelectedItemSet: SelectSelectedItemSet = (event) => {
        const id = String(event.detail.payload.value)
        onSelect(id)
        setName(display(savedFilters.find((filter) => value(filter.sys_id) === id)?.name))
    }
    const trimmed = name.trim()
    return <nav className="todo-saved-filters" aria-label="Saved filters">
        <Select label="Saved view" items={items} selectedItem={selectedId} manageSelectedItem disabled={disabled} onSelectedItemSet={onSelectedItemSet} />
        <Input label="View name" value={name} manageValue disabled={disabled} onInput={onInput} onValueSet={onValueSet} />
        <Button label="Save current" disabled={disabled || !trimmed} onClicked={() => void onSave(trimmed).then(() => setName(''))} />
        <Button label="Rename" variant="secondary" disabled={disabled || !selected || !trimmed} onClicked={() => void onRename(selectedId, trimmed)} />
        <Button label="Delete" variant="secondary-negative" disabled={disabled || !selected} onClicked={() => void onDelete(selectedId)} />
    </nav>
}
