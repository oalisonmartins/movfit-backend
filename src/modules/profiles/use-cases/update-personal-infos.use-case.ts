import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { Profile } from 'src/modules/profiles/types/profile.types'
import { UpdatePersonalInfosInput } from 'src/modules/profiles/types/update-personal-infos.types'

@Injectable()
export class UpdatePersonalInfosUseCase {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: UpdatePersonalInfosInput): Promise<Profile> {
    const userId = this.requestContext.getUserId

    const newPersonalInfos = await this.profilesRepository.update(userId, input)

    return {
      id: newPersonalInfos.id,
      biologicalSex: newPersonalInfos.biologicalSex,
      birthDate: newPersonalInfos.birthDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      heightInCm: newPersonalInfos.heightInCm,
      targetWeightInKg: newPersonalInfos.targetWeightInKg,
      timezone: newPersonalInfos.timezone,
      weightInKg: newPersonalInfos.weightInKg,
    }
  }
}
