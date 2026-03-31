export function getTodayInTimezone(timezone: string): Date {
  const now = new Date()

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)

  const year = Number(parts.find((p) => p.type === 'year')?.value)
  const month = Number(parts.find((p) => p.type === 'month')?.value) - 1
  const day = Number(parts.find((p) => p.type === 'day')?.value)

  return new Date(year, month, day)
}
