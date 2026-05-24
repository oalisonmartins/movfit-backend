import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { CompleteProfileInput } from '../types/complete-profile.type'

@Injectable()
export abstract class ProfileRepository {
  abstract findOne(userId: string): Promise<Profile | null>
  abstract upsert(userId: string, data: CompleteProfileInput): Promise<Profile>
}
