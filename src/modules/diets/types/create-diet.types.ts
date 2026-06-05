import { DietGoal } from 'generated/prisma/enums'

export type CreateDietRepositoryInput = {
  userId: string
  goal: DietGoal
  totalCalorieInKcal: number
  totalProteinInGrams: number
  totalCarbInGrams: number
  totalFatInGrams: number
}

export type CreateDietInput = {
  goal: DietGoal
  meals: {
    name: string
    scheduledTimeInSeconds: number
    foods: {
      foodId: string
      amountInGrams: number
    }[]
  }[]
}

export type CreateDietOutput = {
  id: string
  goal: DietGoal
  totalCalorieInKcal: number
  totalProteinInGrams: number
  totalCarbInGrams: number
  totalFatInGrams: number
}
