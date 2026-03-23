type ToPercentageInputData = {
  goal: number
  current: number
}

export function toPercentage({ current, goal }: ToPercentageInputData): number {
  if (goal === 0) return 0
  return Math.floor(Math.min((current / goal) * 100, 100))
}
