import { DietGoal } from 'generated/prisma/enums'

type CalculateMacrosInput = {
  adjustedTdee: number
  dietGoal: DietGoal
}

export const calculateMacros = ({ adjustedTdee, dietGoal }: CalculateMacrosInput) => {
  const macrosDistribuition = {
    BULKING: {
      protein: 0.3,
      carb: 0.5,
      fat: 0.2,
    },
    CUTTING: {
      protein: 0.4,
      carb: 0.3,
      fat: 0.3,
    },
    WEIGHT_LOSS: {
      protein: 0.35,
      carb: 0.35,
      fat: 0.3,
    },
    MAINTENANCE: {
      protein: 0.3,
      carb: 0.4,
      fat: 0.3,
    },
  }

  const proteinInKcal = adjustedTdee * macrosDistribuition[dietGoal].protein
  const carbInKcal = adjustedTdee * macrosDistribuition[dietGoal].carb
  const fatInKcal = adjustedTdee * macrosDistribuition[dietGoal].fat

  return {
    caloriesInKcal: Math.round(adjustedTdee),
    proteinInGrams: Math.round(proteinInKcal / 4),
    carbInGrams: Math.round(carbInKcal / 4),
    fatInGrams: Math.round(fatInKcal / 9),
  }
}
