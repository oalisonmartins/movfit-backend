import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { DietsPreference } from 'src/modules/diets/preference/types/diets-preference.types'

@Injectable()
export class GetDietsPreferenceUseCase {
  constructor(
    private readonly dietsPreferenceRepository: DietsPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<DietsPreference | null> {
    const userId = this.requestContext.getUserId

    const dietsPreference = await this.dietsPreferenceRepository.findOne(userId)

    if (!dietsPreference) return null

    return {
      id: dietsPreference.id,
      goal: dietsPreference.goal,
      generationType: dietsPreference.generationType,
      createdAt: dietsPreference.createdAt,
      updatedAt: dietsPreference.updatedAt,
    }
  }
}
