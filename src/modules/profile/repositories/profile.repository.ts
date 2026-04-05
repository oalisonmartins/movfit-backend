import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/browser'
import { CompleteProfileRequest } from '../types/complete-profile.type'

@Injectable()
export abstract class ProfileRepository {
  abstract completeProfile(userId: string, input: CompleteProfileRequest): Promise<void>
  abstract getProfile(userId: string): Promise<Profile | null>
}
