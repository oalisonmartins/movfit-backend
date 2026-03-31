import { DailyNutritionGetPayload } from 'generated/prisma/models'

export type UpdateTodayNutritionInput = {
  userId: string
  proteinsInGrams?: number
  carbsInGrams?: number
  fatsInGrams?: number
}

export type UpdateTodayNutritionOutput = DailyNutritionGetPayload<{
  select: {
    day: true
    carbsInGrams: true
    fatsInGrams: true
    proteinsInGrams: true
  }
}>
