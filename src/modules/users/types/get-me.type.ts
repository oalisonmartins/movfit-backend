import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'

export type GetMeResponse = {
  name: string
  email: string
  profile: {
    goal: Goal
    biologicalSex: BiologicalSex
    birthDate: Date
    heightInCentimeters: number
    weightInGrams: number
    targetWeightInGrams: number
  }
  workoutConfig: {
    id?: string
    focusMuscles?: FocusMuscle[]
    freeDaysPerWeek?: number
    freeTimeByDayInSeconds?: number
  }
}
