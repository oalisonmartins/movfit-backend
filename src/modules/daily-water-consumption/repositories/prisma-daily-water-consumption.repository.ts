import { Injectable } from '@nestjs/common'
import { DailyWaterConsumption } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UpsertDailyWaterConsumptionInput } from '../types/upsert-consumption.type'
import { DailyWaterConsumptionRepository } from './daily-water-consumption.repository'

@Injectable()
export class PrismaDailyWaterConsumptionRepository extends BaseRepository implements DailyWaterConsumptionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async get(userId: string): Promise<DailyWaterConsumption | null> {
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
