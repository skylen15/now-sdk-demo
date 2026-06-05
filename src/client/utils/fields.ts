export type ServiceNowField = string | { value?: string; display_value?: string } | null | undefined

export function display(field: ServiceNowField): string {
    if (typeof field === 'string') return field
    return field?.display_value || field?.value || ''
}

export function value(field: ServiceNowField): string {
    if (typeof field === 'string') return field
    return field?.value || field?.display_value || ''
}
