type DateParts = [day: string, month: string, year: string]

export const parseDate = (value: string): Date => {
  const [day, month, year] = value.split('/') as DateParts
  return new Date(Date.UTC(+year, +month - 1, +day))
}
