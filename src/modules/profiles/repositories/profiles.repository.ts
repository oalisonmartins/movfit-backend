import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { UpdatePersonalInfosInput } from 'src/modules/profiles/types/update-personal-infos.types'
import { SetPersonalInfosInput } from '../types/set-personal-infos.type'

@Injectable()
export abstract class ProfilesRepository {
  abstract findOne(userId: string): Promise<Profile | null>
  abstract create(userId: string, input: SetPersonalInfosInput): Promise<Profile>
  abstract update(userId: string, input: UpdatePersonalInfosInput): Promise<Profile>
}
