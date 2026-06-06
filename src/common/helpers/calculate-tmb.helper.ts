import { BiologicalSex } from 'generated/prisma/enums'

type CalculateTmbInput = {
  weightInKg: number
  heightInCm: number
  age: number
  biologicalSex: BiologicalSex
}

export const calculateTmb = ({ weightInKg, heightInCm, age, biologicalSex }: CalculateTmbInput) => {
  if (biologicalSex === 'MALE') {
    return 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
  }

  return 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161
}
