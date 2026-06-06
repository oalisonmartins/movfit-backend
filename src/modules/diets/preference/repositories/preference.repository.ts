import { Injectable } from '@nestjs/common'
import { DietPreference } from 'generated/prisma/client'
import { SetDietPreferenceInput } from 'src/modules/diets/preference/types/set-preference.types'
import { UpdateDietPreferenceInput } from 'src/modules/diets/preference/types/update-preference.types'

@Injectable()
export abstract class DietPreferenceRepository {
  abstract create(userId: string, input: SetDietPreferenceInput): Promise<DietPreference>
  abstract findOne(userId: string): Promise<DietPreference | null>
  abstract update(userId: string, input: UpdateDietPreferenceInput): Promise<DietPreference>
}
