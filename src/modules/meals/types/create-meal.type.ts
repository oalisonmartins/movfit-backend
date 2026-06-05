export type MealFood = {
  foodId: string

  amountInGrams: number

  calorieInKcal: number
  proteinInGrams: number
  carbInGrams: number
  fatInGrams: number
}

export type CreateMealInput = {
  userId: string
  dietId: string
  scheduledTimeInSeconds: number
  name: string

  totalCalorieInKcal: number
  totalCarbInGrams: number
  totalProteinInGrams: number
  totalFatInGrams: number

  foods: MealFood[]
}
