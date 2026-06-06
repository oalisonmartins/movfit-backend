import { Injectable } from '@nestjs/common'
import { Profile } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { SetPersonalInfosInput } from 'src/modules/profiles/types/set-personal-infos.type'
import { UpdatePersonalInfosInput } from 'src/modules/profiles/types/update-personal-infos.types'

@Injectable()
export class PrismaProfilesRepository extends BaseRepository implements ProfilesRepository {
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

  async create(userId: string, input: SetPersonalInfosInput): Promise<Profile> {
    return await this.db.profile.create({
      data: {
        userId,
        ...input,
      },
    })
  }

  async update(userId: string, input: UpdatePersonalInfosInput): Promise<Profile> {
    return await this.db.profile.update({
      where: { userId },
      data: input,
    })
  }
}
