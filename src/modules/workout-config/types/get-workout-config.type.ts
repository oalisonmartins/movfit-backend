import { FocusMuscle } from 'generated/prisma/enums'

export type GetWorkoutConfigOutput = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
}
