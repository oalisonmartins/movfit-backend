import { BiologicalSex, FitnessLevel } from 'generated/prisma/enums'

export type CompleteProfileInput = {
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCm: number
  weightInKg: number
  targetWeightInKg: number
  timezone: string
  fitnessLevel: FitnessLevel
}

export type CompleteProfileOutput = {
  id: string
  weightInKg: number
  targetWeightInKg: number
  heightInCm: number
  biologicalSex: BiologicalSex
  timezone: string
  birthDate: string
}
