export class GetTodayNutritionProgressOutput {
  carbs: {
    goalInGrams: number
    totalConsumedInGrams: number
    totalConsumedInPercentage: number
  }
  proteins: {
    goalInGrams: number
    totalConsumedInGrams: number
    totalConsumedInPercentage: number
  }
  fats: {
    goalInGrams: number
    totalConsumedInGrams: number
    totalConsumedInPercentage: number
  }
}
