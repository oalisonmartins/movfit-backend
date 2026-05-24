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
    scheduleTimeInSeconds: number
    foods: {
      foodId: string
      amountInGrams: number
    }[]
  }[]
}

export type CreateDietOutput = {
  id: string
  goal: DietGoal
  macros: {
    calorieInKcal: number
    proteinInGrams: number
    carbInGrams: number
    fatInGrams: number
  }
}
