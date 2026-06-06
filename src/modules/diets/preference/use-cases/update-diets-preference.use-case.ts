import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { UpdateDietsPreferenceInput } from 'src/modules/diets/preference/types/update-diets-preference.types'

@Injectable()
export class UpdateDietsPreferenceUseCase {
  constructor(
    private readonly dietsPreferenceRepository: DietsPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: UpdateDietsPreferenceInput) {
    const userId = this.requestContext.getUserId

    const preferenceToUpdate = await this.dietsPreferenceRepository.findOne(userId)

    if (!preferenceToUpdate) {
      throw new HttpException(
        {
          message: 'Você não possui preferências alimentares definidass',
          code: 'DIET_PREFERENCES_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedPreferences = await this.dietsPreferenceRepository.update(userId, input)

    return {
      id: updatedPreferences.id,
      goal: updatedPreferences.goal,
      generationType: updatedPreferences.generationType,
      updatedAt: updatedPreferences.updatedAt,
    }
  }
}
