export const parseDateToBrFormat = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)

  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0))
}
