import { NutritionEntryGetPayload } from 'generated/prisma/models'

export type AddNutritionEntryInput = {
  date: Date
  amountInGrams: number
  foodId: string
  dietId: string
  mealId: string
}

export type NutritionEntryWithFood = NutritionEntryGetPayload<{
  include: {
    food: true
  }
}>
