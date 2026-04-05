import { BiologicalSex, Goal } from 'generated/prisma/enums'

export type CompleteProfileRequest = {
  goal: Goal
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCentimeters: number
  weightInGrams: number
  targetWeightInGrams: number
  timezone: string
}
