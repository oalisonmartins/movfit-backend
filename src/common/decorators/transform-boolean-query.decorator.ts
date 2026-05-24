import { Transform } from 'class-transformer'

export const TransformBooleanQuery = () => {
  return Transform(({ value }) => {
    if (value === undefined) return undefined
    if (value === 'false') return false
    return true
  })
}
