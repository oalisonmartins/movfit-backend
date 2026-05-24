import { Transform } from 'class-transformer'

export const TransformDate = () => {
  return Transform(({ value }) => {
    if (!value || typeof value !== 'string') return value

    const [day, month, year] = value.split('/').map(Number)
    return new Date(Date.UTC(year, month - 1, day))
  })
}
