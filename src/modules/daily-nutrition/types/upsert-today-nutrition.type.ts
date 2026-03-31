import { DailyNutritionGetPayload } from 'generated/prisma/models'

export type UpsertTodayNutritionInput = {
  userId: string
  timezone: string
  carbsInGrams?: number
  proteinsInGrams?: number
  fatsInGrams?: number
}

export type UpsertTodayNutritionOutput = DailyNutritionGetPayload<{
  select: {
    day: true
    carbsInGrams: true
    fatsInGrams: true
    proteinsInGrams: true
  }
}>
