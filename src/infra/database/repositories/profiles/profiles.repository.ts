import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { ProfileRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { SetPersonalInfosInput } from 'src/modules/profiles/types/set-personal-infos.type'

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

  // TODO: Criar métodos "create" e "update"
  async upsert(userId: string, input: SetPersonalInfosInput): Promise<Profile> {
    return await this.db.profile.upsert({
      where: { userId },
      create: {
        userId,
        biologicalSex: input.biologicalSex,
        birthDate: input.birthDate,
        heightInCm: input.heightInCm,
        targetWeightInKg: input.targetWeightInKg,
        weightInKg: input.weightInKg,
        timezone: input.timezone,
        fitnessLevel: input.fitnessLevel,
      },
      update: { userId, ...input },
    })
  }
}
