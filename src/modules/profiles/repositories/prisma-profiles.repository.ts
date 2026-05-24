import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { ProfileRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { CompleteProfileInput } from 'src/modules/profiles/types'

@Injectable()
export class PrismaProfileRepository extends BaseRepository implements ProfileRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(userId: string): Promise<Profile | null> {
    return await this.db.profile.findFirst({
      where: { userId },
    })
  }

  async upsert(userId: string, data: CompleteProfileInput): Promise<Profile> {
    return await this.db.$transaction(async (tx) => {
      const upsertedProfile = await tx.profile.upsert({
        where: { userId },
        create: {
          userId,
          biologicalSex: data.biologicalSex,
          birthDate: data.birthDate,
          goal: data.goal,
          heightInCentimeters: data.heightInCentimeters,
          targetWeightInKg: data.targetWeightInKg,
          weightInKg: data.weightInKg,
          timezone: data.timezone,
        },
        update: {
          userId,
          ...data,
        },
      })

      await tx.user.update({
        where: {
          id: upsertedProfile.userId,
          // isOnboardingCompleted: { equals: false },
        },
        data: {
          isOnboardingCompleted: true,
        },
      })

      return upsertedProfile
    })
  }
}
