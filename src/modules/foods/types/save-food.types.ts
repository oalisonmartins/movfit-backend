import { FoodSource } from 'generated/prisma/enums'

export type SaveFoodInput = {
  userId?: string
  name: string
  source: FoodSource
  isRecipe?: boolean
  description?: string
  coverImageUrl?: string
  caloriePer100gInKcal: number
  proteinPer100gInGrams: number
  carbPer100gInGrams: number
  fatPer100gInGrams: number
}

export type SaveFoodOutput = {
  id: string
  name: string
  source: FoodSource
  isRecipe: boolean
  description: string | null
  coverImageUrl: string | null
  caloriePer100gInKcal: number
  proteinPer100gInGrams: number
  carbPer100gInGrams: number
  fatPer100gInGrams: number
}
