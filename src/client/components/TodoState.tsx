import { Alert } from '@servicenow/react-components/Alert'
import { Loader } from '@servicenow/react-components/Loader'

interface TodoStateProps {
    errorMessage: string | null
    isEmpty: boolean
    isLoading: boolean
    hasNoResults: boolean
}

export function TodoState({ errorMessage, isEmpty, isLoading, hasNoResults }: TodoStateProps) {
    if (errorMessage) {
        return (
            <div className="todo-state">
                <Alert status="critical" content={errorMessage} />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="todo-state">
                <Loader label="Loading tasks..." size="md" announceLabel />
            </div>
        )
    }

    if (isEmpty) {
        return <p className="todo-state">No tasks yet. Add one above.</p>
    }

    if (hasNoResults) {
        return <p className="todo-state">No tasks match the current filters.</p>
    }

    return null
}
