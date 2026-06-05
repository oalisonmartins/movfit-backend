import { EmphasizedMuscle, WorkoutGoal } from 'generated/prisma/enums'

export type CreateWorkoutPreferenceInput = {
  goal: WorkoutGoal
  availableDaysPerWeek: number
  availableTimePerDayInSeconds: number
  emphasizedMuscles?: EmphasizedMuscle[]
}
