export type AddNutritionEntryInput = {
  date: Date
  amountInGrams: number
  foodId: string
  dietId?: string
  mealId?: string
}
