import { Injectable } from '@nestjs/common'
import { DietPreference } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { DietPreferenceRepository } from 'src/modules/diets/preference/repositories/preference.repository'
import { SetDietPreferenceInput } from 'src/modules/diets/preference/types/set-preference.types'
import { UpdateDietPreferenceInput } from 'src/modules/diets/preference/types/update-preference.types'

@Injectable()
export class PrismaDietPreferenceRepository
  extends BaseRepository
  implements DietPreferenceRepository
{
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(userId: string, input: SetDietPreferenceInput): Promise<DietPreference> {
    return await this.db.dietPreference.create({
      data: {
        userId,
        goal: input.goal,
        generationType: input.generationType,
      },
    })
  }

  async findOne(userId: string): Promise<DietPreference | null> {
    return await this.db.dietPreference.findUnique({
      where: { userId },
    })
  }

  async update(userId: string, input: UpdateDietPreferenceInput): Promise<DietPreference> {
    return await this.db.dietPreference.update({
      where: { userId },
      data: {
        generationType: input.generationType,
        goal: input.goal,
      },
    })
  }
}
