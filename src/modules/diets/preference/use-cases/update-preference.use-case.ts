import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietPreferenceRepository } from 'src/modules/diets/preference/repositories/preference.repository'
import { UpdateDietPreferenceInput } from 'src/modules/diets/preference/types/update-preference.types'

@Injectable()
export class UpdateDietPreferenceUseCase {
  constructor(
    private readonly dietPreferenceRepository: DietPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: UpdateDietPreferenceInput) {
    const userId = this.requestContext.getUserId

    const preferenceToUpdate = await this.dietPreferenceRepository.findOne(userId)

    if (!preferenceToUpdate) {
      throw new HttpException(
        {
          message: 'Você não possui preferências alimentares definidass',
          code: 'DIET_PREFERENCES_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedPreferences = await this.dietPreferenceRepository.update(userId, input)

    return {
      id: updatedPreferences.id,
      goal: updatedPreferences.goal,
      generationType: updatedPreferences.generationType,
      updatedAt: updatedPreferences.updatedAt,
    }
  }
}
