export function localDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function parseServiceNowDateTime(raw: string): Date | null {
    if (!raw) return null
    const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw)
        ? raw.replace(' ', 'T') + 'Z'
        : raw
    const date = new Date(normalized)
    return Number.isNaN(date.getTime()) ? null : date
}

export function localDateEndAsServiceNowValue(dateKey: string): string {
    if (!dateKey) return ''
    const [year, month, day] = dateKey.split('-').map(Number)
    const localEnd = new Date(year, month - 1, day, 23, 59, 59)
    if (Number.isNaN(localEnd.getTime())) return ''
    return localEnd.toISOString().slice(0, 19).replace('T', ' ')
}
