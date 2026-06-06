import {
  BiologicalSex,
  DietGenerationType,
  DietGoal,
  EmphasizedMuscle,
} from 'generated/prisma/enums'

export type MeOutput = {
  id: string
  name: string
  email: string
  profile: {
    id: string
    biologicalSex: BiologicalSex
    birthDate: string
    heightInCm: number
    weightInKg: number
    targetWeightInKg: number
    timezone: string
  }
  workoutPreference: {
    id: string
    emphasizedMuscles: EmphasizedMuscle[]
    availableDaysPerWeek: number
    availableTimePerDayInSeconds: number
  }
  dietPreference: {
    id: string
    goal: DietGoal
    generationType: DietGenerationType
    updatedAt: Date
  }
}
