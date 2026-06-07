import { BiologicalSex, FitnessLevel } from 'generated/prisma/enums'

export type SetPersonalInfosInput = {
  biologicalSex: BiologicalSex
  birthDate: Date
  heightInCm: number
  weightInKg: number
  targetWeightInKg: number
  timezone: string
  fitnessLevel: FitnessLevel
}
