import { FocusMuscle } from 'generated/prisma/enums'

export type CreateWorkoutConfigInput = {
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles?: FocusMuscle[]
}
