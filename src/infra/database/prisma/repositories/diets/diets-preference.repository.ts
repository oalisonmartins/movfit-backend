import { Injectable } from '@nestjs/common'
import { DietPreference } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { SetDietPreferenceInput } from 'src/modules/diets/preference/types/set-diets-preference.types'
import { UpdateDietsPreferenceInput } from 'src/modules/diets/preference/types/update-diets-preference.types'

@Injectable()
export class PrismaDietsPreferenceRepository
  extends BaseRepository
  implements DietsPreferenceRepository
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

  async update(userId: string, input: UpdateDietsPreferenceInput): Promise<DietPreference> {
    return await this.db.dietPreference.update({
      where: { userId },
      data: {
        generationType: input.generationType,
        goal: input.goal,
      },
    })
  }
}
