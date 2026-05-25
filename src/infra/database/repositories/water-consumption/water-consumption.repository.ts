import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { WaterConsumptionRepository } from 'src/modules/water-consumption/repositories/water-consumption.repository'
import {
  GetWaterConsumptionHistoryRepositoryInput,
  RegisterWaterConsumptionRepositoryInput,
} from 'src/modules/water-consumption/types'

@Injectable()
export class PrismaWaterConsumptionRepository extends BaseRepository implements WaterConsumptionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findHistory(input: GetWaterConsumptionHistoryRepositoryInput): Promise<WaterConsumption[]> {
    return await this.db.waterConsumption.findMany({
      where: {
        userId: input.userId,
        dateOfConsumption: {
          gte: input.fromDate,
          lte: input.toDate,
        },
      },
      orderBy: {
        dateOfConsumption: 'desc',
      },
    })
  }

  async create(input: RegisterWaterConsumptionRepositoryInput): Promise<WaterConsumption> {
    return await this.db.$transaction(async (tx) => {
      const waterConsumption = await tx.waterConsumption.create({
        data: {
          userId: input.userId,
          dailyWaterConsumptionId: input.dailyWaterConsumptionId,
          amountConsumedInMl: input.amountConsumedInMl,
          dateOfConsumption: input.dateOfConsumption,
        },
      })

      await tx.dailyWaterConsumption.update({
        where: { userId: input.userId, id: input.dailyWaterConsumptionId },
        data: { consumedInMl: { increment: input.amountConsumedInMl } },
      })

      return waterConsumption
    })
  }
}
