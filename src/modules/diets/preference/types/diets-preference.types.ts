import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export type DietsPreference = {
  id: string
  goal: DietGoal
  generationType: DietGenerationType
  createdAt: Date
  updatedAt: Date
}
