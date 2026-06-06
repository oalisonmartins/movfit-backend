import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export type UpdateDietPreferenceInput = {
  goal?: DietGoal
  generationType?: DietGenerationType
}
