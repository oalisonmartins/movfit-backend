import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CompleteProfileRequest } from '../types/complete-profile.type'
import { ProfileRepository } from './profile.repository'

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async completeProfile(userId: string, input: CompleteProfileRequest) {
    await this.prisma.profile.upsert({
      where: { userId },
      create: { userId, ...input },
      update: input,
    })
  }
  async getProfile(userId: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      where: { userId },
    })
    if (!profile) {
      return null
    }
    return profile
  }
}
