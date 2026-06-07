import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { UpdateProfileInput } from 'src/modules/profiles/types/update-profile.types'
import { SetPersonalInfosInput } from '../../onboarding/types/set-personal-infos.types'

@Injectable()
export abstract class ProfilesRepository {
  abstract findOne(userId: string): Promise<Profile | null>
  abstract create(userId: string, input: SetPersonalInfosInput): Promise<Profile>
  abstract update(userId: string, input: UpdateProfileInput): Promise<Profile>
}
