import { NutritionEntryGetPayload } from 'generated/prisma/models'

export type NutritionEntryWithFood = NutritionEntryGetPayload<{
  include: { food: true }
}>
