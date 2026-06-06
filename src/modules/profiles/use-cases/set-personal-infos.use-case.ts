import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfileRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { Profile } from 'src/modules/profiles/types/profile.types'
import { SetPersonalInfosInput } from '../types/set-personal-infos.type'

@Injectable()
export class SetPersonalInfosUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  // TODO: Adicionar campos "locale" e "language" ao Profile.
  async execute(input: SetPersonalInfosInput): Promise<Profile> {
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
