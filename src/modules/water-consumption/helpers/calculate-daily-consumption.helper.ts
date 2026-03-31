import { calculateAge } from 'src/common/helpers/calculate-age.helper'
import { CalculateDailyWaterConsumptionInput } from '../types/calculate-daily-water-consumption.type'

const goalFactors = {
  LOSE_WEIGHT: 40,
  GAIN_MASS: 40,
  DEFINE: 38,
  MAINTAIN_WEIGHT: 35,
}

export function calculateDailyConsumption(input: CalculateDailyWaterConsumptionInput) {
  const weightInKg = input.weightInGrams / 1000
  const goalFactor = goalFactors[input.goal]
  const sexFactor = input.biologicalSex === 'MALE' ? 1.1 : 1.0

  const age = calculateAge(input.birthDate)
  const ageFactor = age > 55 ? 0.9 : age < 18 ? 1.1 : 1.0

  const dailyConsumptionInMl = Math.round(weightInKg * goalFactor * sexFactor * ageFactor)

  return dailyConsumptionInMl
}
