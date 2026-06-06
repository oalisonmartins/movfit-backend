import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { SetPersonalInfosInput } from '../types/set-personal-infos.type'

@Injectable()
export abstract class ProfileRepository {
  abstract findOne(userId: string): Promise<Profile | null>
  abstract upsert(userId: string, input: SetPersonalInfosInput): Promise<Profile>
}
