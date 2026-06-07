import { EmphasizedMuscle, WorkoutGoal } from 'generated/prisma/enums'

export type SetWorkoutPreferenceInput = {
  goal: WorkoutGoal
  availableDaysPerWeek: number
  availableTimePerDayInSeconds: number
  emphasizedMuscles?: EmphasizedMuscle[]
}
