import { Injectable } from '@nestjs/common'
import { DailyWaterConsumption } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { DailyWaterConsumptionRepository } from '../../../../modules/daily-water-consumption/repositories/daily-water-consumption.repository'
import { UpsertDailyWaterConsumptionInput } from '../../../../modules/daily-water-consumption/types/upsert-daily-water-consumption.types'

@Injectable()
export class PrismaDailyWaterConsumptionRepository extends BaseRepository implements DailyWaterConsumptionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(userId: string): Promise<DailyWaterConsumption | null> {
    return await this.db.dailyWaterConsumption.findFirst({
      where: { userId: userId },
    })
  }

  async upsert(userId: string, input: UpsertDailyWaterConsumptionInput): Promise<DailyWaterConsumption> {
    return await this.db.dailyWaterConsumption.upsert({
      where: { userId },
      create: {
        userId,
        targetInMl: input.consumptionTargetInMl,
        consumedInMl: 0,
      },
      update: {
        targetInMl: input.consumptionTargetInMl,
        consumedInMl: { increment: input.totalConsumedInMl },
      },
    })
  }
}
