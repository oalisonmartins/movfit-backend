import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'

export type MeOutput = {
  id: string
  name: string
  email: string
  profile: {
    id: string
    goal: Goal
    biologicalSex: BiologicalSex
    birthDate: Date
    heightInCentimeters: number
    weightInGrams: number
    targetWeightInGrams: number
    timezone: string
  }
  workoutConfig: {
    id: string
    focusMuscles: FocusMuscle[]
    freeDaysPerWeek: number
    freeTimeByDayInSeconds: number
  }
}
