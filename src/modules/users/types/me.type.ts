import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'

export type MeOutput = {
  id: string
  name: string
  email: string
  profile: {
    id: string
    goal: Goal
    biologicalSex: BiologicalSex
    birthDate: string
    heightInCentimeters: number
    weightInKg: number
    targetWeightInKg: number
    timezone: string
  }
  workoutConfig: {
    id: string
    focusMuscles: FocusMuscle[]
    freeDaysPerWeek: number
    freeTimeByDayInSeconds: number
  }
}
