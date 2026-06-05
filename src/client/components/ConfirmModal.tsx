import { useCallback } from 'react'
import { Modal, type ModalFooterActionClicked, type ModalOpenedSet } from '@servicenow/react-components/Modal'

interface ConfirmModalProps {
    opened: boolean
    headerLabel: string
    content: string
    confirmLabel: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({ opened, headerLabel, content, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
    const handleOpenedSet = useCallback<ModalOpenedSet>(() => {
        onCancel()
    }, [onCancel])

    const handleFooterAction = useCallback<ModalFooterActionClicked>((event) => {
        if (event.detail.payload.action.label === confirmLabel) {
            onConfirm()
            return
        }
        onCancel()
    }, [confirmLabel, onCancel, onConfirm])

    return (
        <Modal
            opened={opened}
            size="sm"
            headerLabel={headerLabel}
            content={content}
            footerActions={[
                { label: 'Cancel', variant: 'secondary' },
                { label: confirmLabel, variant: 'primary-negative' },
            ]}
            onOpenedSet={handleOpenedSet}
            onFooterActionClicked={handleFooterAction}
        />
    )
}
