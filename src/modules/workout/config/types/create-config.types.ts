import { FocusMuscle, WorkoutGoal } from 'generated/prisma/enums'

export type CreateWorkoutConfigInput = {
  goal: WorkoutGoal
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles?: FocusMuscle[]
}
