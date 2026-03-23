import { BiologicalSex, UserGoal } from 'generated/prisma/enums'
import { calculateAge } from '../../../common/helpers/calculate-age.helper'

type DailyConsumptionInputData = {
  weightInGrams: number
  biologicalSex: BiologicalSex
  birthDate: Date
  goal: UserGoal
}

type DailyConsumptionOutputData = {
  dailyConsumptionInMl: number
}

const goalFactors = {
  LOSE_WEIGHT: 40,
  GAIN_MASS: 40,
  DEFINE: 38,
  MAINTAIN_WEIGHT: 35,
}

export function calculateUserDailyConsumption(
  data: DailyConsumptionInputData,
): DailyConsumptionOutputData {
  const weightInKg = data.weightInGrams / 1000
  const goalFactor = goalFactors[data.goal]
  const sexFactor = data.biologicalSex === 'MALE' ? 1.1 : 1.0

  const age = calculateAge(data.birthDate)
  const ageFactor = age > 55 ? 0.9 : age < 18 ? 1.1 : 1.0

  const dailyConsumptionInMl = Math.round(weightInKg * goalFactor * sexFactor * ageFactor)

  return {
    dailyConsumptionInMl,
  }
}
