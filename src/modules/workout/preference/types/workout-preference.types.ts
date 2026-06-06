import { EmphasizedMuscle } from 'generated/prisma/enums'

export type WorkoutPreference = {
  id: string
  availableDaysPerWeek: number
  availableTimePerDayInSeconds: number
  emphasizedMuscles: EmphasizedMuscle[]
  createdAt?: Date
  updatedAt?: Date
}
