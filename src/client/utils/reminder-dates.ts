function pad(value: number): string {
    return String(value).padStart(2, '0')
}

export function localDateTimeAsServiceNowValue(input: string): string {
    if (!input) return ''
    const date = new Date(input)
    if (Number.isNaN(date.getTime())) return ''
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:00`
}

export function localDateTimeInputValue(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
