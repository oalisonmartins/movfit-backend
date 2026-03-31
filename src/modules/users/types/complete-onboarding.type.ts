import { BiologicalSex, Goal } from 'generated/prisma/enums'

export type CompleteOnboardingInput = {
  userId: string
  goal: Goal
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCentimeters: number
  weightInGrams: number
  targetWeightInGrams: number
  timezone: string
}
