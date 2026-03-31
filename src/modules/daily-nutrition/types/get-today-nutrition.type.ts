import { DailyNutritionGetPayload } from 'generated/prisma/models'

export type GetTodayNutritionInput = {
  userId: string
  timezone: string
}

export type GetTodayNutritionOutput = DailyNutritionGetPayload<{
  select: {
    day: true
    carbsInGrams: true
    fatsInGrams: true
    proteinsInGrams: true
  }
}>
