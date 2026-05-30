import { FocusMuscle } from 'generated/prisma/enums'

export type WorkoutConfigOutput = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
  createdAt: string
}
