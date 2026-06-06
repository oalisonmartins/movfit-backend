import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export type UpdateDietsPreferenceInput = {
  goal?: DietGoal
  generationType?: DietGenerationType
}
