import { Goal } from 'generated/prisma/enums'

export type UserGetDietsResponse = Array<{
  id: string
  isActive: boolean
  proteinsInGrams: number
  carbsInGrams: number
  fatsInGrams: number
  goal: Goal
  meals: {
    id: string
    timeInMinutes: number
    totalCalories: number
    carbsInGrams: number
    proteinsInGrams: number
    fatsInGrams: number
    foods: {
      id: string
      name: string
      quantity: number
      caloriesInKcal: number
    }[]
  }[]
}>
