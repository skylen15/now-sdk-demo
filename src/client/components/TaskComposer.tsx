import { useCallback, useState } from 'react'
import { Button } from '@servicenow/react-components/Button'
import { Input, type InputEnterKeydown, type InputInput, type InputValueSet } from '@servicenow/react-components/Input'

interface TaskComposerProps {
    disabled: boolean
    onCreate: (title: string) => Promise<unknown>
}

export function TaskComposer({ disabled, onCreate }: TaskComposerProps) {
    const [title, setTitle] = useState('')

    const updateTitle = useCallback((nextTitle: string) => {
        setTitle(nextTitle)
    }, [])

    const handleInput = useCallback<InputInput>((event) => {
        updateTitle(event.detail.payload.fieldValue)
    }, [updateTitle])

    const handleValueSet = useCallback<InputValueSet>((event) => {
        updateTitle(event.detail.payload.value)
    }, [updateTitle])

    const submit = useCallback(async () => {
        const trimmed = title.trim()
        if (!trimmed) return
        await onCreate(trimmed)
        setTitle('')
    }, [onCreate, title])

    const handleEnter = useCallback<InputEnterKeydown>(async () => {
        await submit()
    }, [submit])

    return (
        <div className="todo-composer">
            <Input
                label="New task"
                placeholder="What needs to be done?"
                value={title}
                manageValue
                required
                disabled={disabled}
                onInput={handleInput}
                onValueSet={handleValueSet}
                onEnterKeydown={handleEnter}
            />
            <Button label="Add" variant="primary" disabled={disabled || !title.trim()} onClicked={submit} />
        </div>
    )
}
