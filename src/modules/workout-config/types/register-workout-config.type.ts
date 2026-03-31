import { FocusMuscle } from 'generated/prisma/enums'

export type RegisterWorkoutConfigInput = {
  userId: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles?: FocusMuscle[]
}

export type RegisterWorkoutConfigOutput = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
}
