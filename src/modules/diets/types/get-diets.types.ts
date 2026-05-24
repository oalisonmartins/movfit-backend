import { DietGoal } from 'generated/prisma/enums'

export type GetDietsOutput = {
  id: string
  goal: DietGoal
  isActive: boolean
  createdAt: string
  totalCaloriesInKcal: number
  totalProteinsInGrams: number
  totalCarbsInGrams: number
  totalFatsInGrams: number
}
