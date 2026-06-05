import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfileRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { CompleteProfileInput, CompleteProfileOutput } from '../types/complete-profile.type'

@Injectable()
export class CompleteProfileUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  // TODO: Adicionar campos "locale" e "language" ao Profile.
  async execute(input: CompleteProfileInput): Promise<CompleteProfileOutput> {
    const userId = this.requestContext.getUserId
    const profile = await this.profileRepository.upsert(userId, input)

    return {
      id: profile.id,
      weightInKg: profile.weightInKg,
      targetWeightInKg: profile.targetWeightInKg,
      heightInCm: profile.heightInCm,
      biologicalSex: profile.biologicalSex,
      timezone: profile.timezone,
      birthDate: input.birthDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }
  }
}
