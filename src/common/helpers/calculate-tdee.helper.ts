import { DietGoal } from 'generated/prisma/enums'

type CalculateTdeeInput = {
  availableDaysPerWeek: number
  tmb: number
  dietGoal: DietGoal
}

export const calculateTdee = ({ availableDaysPerWeek, tmb, dietGoal }: CalculateTdeeInput) => {
  const activityFactor = {
    0: 1.2,
    1: 1.375,
    2: 1.375,
    3: 1.55,
    4: 1.55,
    5: 1.725,
    6: 1.725,
    7: 1.9,
  }

  const goalKcalAdjustment = {
    BULKING: 300,
    CUTTING: -300,
    WEIGHT_LOSS: -500,
    MAINTENANCE: 0,
  }

  const tdee = tmb * activityFactor[availableDaysPerWeek]
  const adjustedTdee = tdee + goalKcalAdjustment[dietGoal]

  return adjustedTdee
}
