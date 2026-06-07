import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export type SetDietPreferenceInput = {
  goal: DietGoal
  generationType: DietGenerationType
}
