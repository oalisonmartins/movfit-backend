import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { Profile } from 'src/modules/profiles/types/profile.types'
import { SetPersonalInfosInput } from '../types/set-personal-infos.types'

@Injectable()
export class SetPersonalInfosUseCase {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: SetPersonalInfosInput): Promise<Profile> {
    const userId = this.requestContext.getUserId

    const personalInfos = await this.profilesRepository.create(userId, input)

    return {
      id: personalInfos.id,
      weightInKg: personalInfos.weightInKg,
      targetWeightInKg: personalInfos.targetWeightInKg,
      heightInCm: personalInfos.heightInCm,
      biologicalSex: personalInfos.biologicalSex,
      timezone: personalInfos.timezone,
      birthDate: personalInfos.birthDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }
  }
}
