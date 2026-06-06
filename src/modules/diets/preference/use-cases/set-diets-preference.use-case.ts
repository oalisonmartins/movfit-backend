import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { SetDietPreferenceInput } from 'src/modules/diets/preference/types/set-diets-preference.types'

@Injectable()
export class SetDietsPreferenceUseCase {
  constructor(
    private readonly dietsPreferenceRepository: DietsPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: SetDietPreferenceInput) {
    const userId = this.requestContext.getUserId

    const existingDietPreference = await this.dietsPreferenceRepository.findOne(userId)

    if (existingDietPreference) {
      throw new HttpException(
        {
          message: 'Você já tem preferências alimentares definidas',
          code: 'EXISTING_DIET_PREFERENCE',
        },
        HttpStatus.CONFLICT,
      )
    }

    const dietPreference = await this.dietsPreferenceRepository.create(userId, input)

    return {
      id: dietPreference.id,
      goal: dietPreference.goal,
      generationType: dietPreference.generationType,
      updatedAt: dietPreference.updatedAt,
    }
  }
}
