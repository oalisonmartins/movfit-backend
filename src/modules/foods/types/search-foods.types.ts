export type SearchFoodsInput = {
  userId: string
  isRecipe?: boolean
  limit: number
  offset: number
}

export type Food = {
  id: string
  name: string
  coverImageUrl: string | null
  description: string | null
  caloriePer100gInKcal: number
  proteinPer100gInGrams: number
  carbPer100gInGrams: number
  fatPer100gInGrams: number
}

export type SearchFoodsOutput = {
  total: number
  foods: Food[]
}
