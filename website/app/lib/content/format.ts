export function formatDate(date: string, includeRelative = false): string {
    let currentDate = new Date()
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    let targetDate = new Date(date)

    let diffDays = Math.floor((currentDate.getTime() - targetDate.getTime()) / 86400000)

    let formattedDate = ''

    if (diffDays < 1) {
        formattedDate = 'Today'
    } else if (diffDays < 30) {
        formattedDate = `${diffDays}d ago`
    } else if (diffDays < 365) {
        formattedDate = `${Math.floor(diffDays / 30)}mo ago`
    } else {
        formattedDate = `${Math.floor(diffDays / 365)}y ago`
    }

    let fullDate = targetDate.toLocaleString('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return fullDate
    }

    return `${fullDate} (${formattedDate})`
}

/** Renders a byte count as a human-readable size, e.g. 204800 -> "200 KB". */
export function formatBytes(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes < 0) return '—'
    if (bytes === 0) return '0 B'

    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
    const value = bytes / Math.pow(1024, exponent)
    const precision = exponent === 0 ? 0 : value < 10 ? 1 : 0

    return `${value.toFixed(precision)} ${units[exponent]}`
}
