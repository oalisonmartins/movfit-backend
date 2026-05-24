import { BiologicalSex, Goal } from 'generated/prisma/enums'

export type CompleteProfileInput = {
  goal: Goal
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCentimeters: number
  weightInKg: number
  targetWeightInKg: number
  timezone: string
}

export type CompleteProfileOutput = {
  id: string
  weightInKg: number
  targetWeightInKg: number
  heightInCentimeters: number
  biologicalSex: BiologicalSex
  timezone: string
  birthDate: string
  goal: Goal
}
