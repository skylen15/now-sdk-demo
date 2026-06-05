import { useCallback } from 'react'
import { Input, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'
import { Select, type SelectItem, type SelectSelectedItemSet } from '@servicenow/react-components/Select'
import {
    anyTagFilter,
    type DueFilter,
    type PriorityFilter,
    type StatusFilter,
    type TodoFilterState,
} from '../utils/task-filters'

interface TaskFiltersProps {
    filters: TodoFilterState
    tags: SelectItem[]
    disabled: boolean
    onChange: (filters: TodoFilterState) => void
}

const statusItems: SelectItem[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
]

const dueItems: SelectItem[] = [
    { id: 'any', label: 'Any date' },
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'overdue', label: 'Overdue' },
]

const priorityItems: SelectItem[] = [
    { id: 'any', label: 'Any priority' },
    { id: 'low', label: 'Low' },
    { id: 'normal', label: 'Normal' },
    { id: 'high', label: 'High' },
    { id: 'urgent', label: 'Urgent' },
]

export function TaskFilters({ filters, tags, disabled, onChange }: TaskFiltersProps) {
    const setSearch = useCallback((search: string) => {
        onChange({ ...filters, search })
    }, [filters, onChange])

    const handleSearchInput = useCallback<InputInput>((event) => {
        setSearch(event.detail.payload.fieldValue)
    }, [setSearch])

    const handleSearchValueSet = useCallback<InputValueSet>((event) => {
        setSearch(event.detail.payload.value)
    }, [setSearch])

    const setStatus = useCallback<SelectSelectedItemSet>((event) => {
        onChange({ ...filters, status: String(event.detail.payload.value) as StatusFilter })
    }, [filters, onChange])

    const setDue = useCallback<SelectSelectedItemSet>((event) => {
        onChange({ ...filters, due: String(event.detail.payload.value) as DueFilter })
    }, [filters, onChange])

    const setPriority = useCallback<SelectSelectedItemSet>((event) => {
        onChange({ ...filters, priority: String(event.detail.payload.value) as PriorityFilter })
    }, [filters, onChange])

    const setTag = useCallback<SelectSelectedItemSet>((event) => {
        onChange({ ...filters, tag: String(event.detail.payload.value) })
    }, [filters, onChange])

    return (
        <div className="todo-filters" aria-label="Task filters">
            <Input
                label="Search"
                value={filters.search}
                manageValue
                disabled={disabled}
                onInput={handleSearchInput}
                onValueSet={handleSearchValueSet}
            />
            <Select
                label="Status"
                items={statusItems}
                selectedItem={filters.status}
                manageSelectedItem
                disabled={disabled}
                onSelectedItemSet={setStatus}
            />
            <Select
                label="Due"
                items={dueItems}
                selectedItem={filters.due}
                manageSelectedItem
                disabled={disabled}
                onSelectedItemSet={setDue}
            />
            <Select
                label="Priority"
                items={priorityItems}
                selectedItem={filters.priority}
                manageSelectedItem
                disabled={disabled}
                onSelectedItemSet={setPriority}
            />
            <Select
                label="Tag"
                items={[{ id: anyTagFilter, label: 'Any tag' }, ...tags]}
                selectedItem={filters.tag}
                manageSelectedItem
                disabled={disabled || tags.length === 0}
                search={tags.length > 8 ? 'contains' : 'none'}
                onSelectedItemSet={setTag}
            />
        </div>
    )
}
