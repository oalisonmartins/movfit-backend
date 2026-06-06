import { Injectable } from '@nestjs/common'
import { DietPreference } from 'generated/prisma/client'
import { SetDietPreferenceInput } from 'src/modules/diets/preference/types/set-diets-preference.types'
import { UpdateDietsPreferenceInput } from 'src/modules/diets/preference/types/update-diets-preference.types'

@Injectable()
export abstract class DietsPreferenceRepository {
  abstract create(userId: string, input: SetDietPreferenceInput): Promise<DietPreference>
  abstract findOne(userId: string): Promise<DietPreference | null>
  abstract update(userId: string, input: UpdateDietsPreferenceInput): Promise<DietPreference>
}
