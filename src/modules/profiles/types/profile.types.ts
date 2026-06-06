import { BiologicalSex } from 'generated/prisma/enums'

export type Profile = {
  id: string
  weightInKg: number
  targetWeightInKg: number
  heightInCm: number
  biologicalSex: BiologicalSex
  timezone: string
  birthDate: string
}
