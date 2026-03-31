import { BiologicalSex, Goal } from 'generated/prisma/enums'

export type CalculateDailyWaterConsumptionInput = {
  weightInGrams: number
  biologicalSex: BiologicalSex
  birthDate: Date
  goal: Goal
}
