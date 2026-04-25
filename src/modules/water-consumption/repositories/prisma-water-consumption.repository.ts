import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetWaterConsumptionHistoryInput } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionRepositoryInput } from '../types/register-water-consumption.types'
import { WaterConsumptionRepository } from './water-consumption.repository'

@Injectable()
export class PrismaWaterConsumptionRepository extends BaseRepository implements WaterConsumptionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async history(userId: string, input: GetWaterConsumptionHistoryInput): Promise<WaterConsumption[]> {
    return await this.db.waterConsumption.findMany({
      where: {
        userId,
        dateOfConsumption: { gte: input.fromDate, lte: input.toDate },
      },
    })
  }

  async register(userId: string, input: RegisterWaterConsumptionRepositoryInput): Promise<WaterConsumption> {
    return await this.db.$transaction(async (tx) => {
      const waterConsumption = await tx.waterConsumption.create({
        data: {
          userId,
          dailyWaterConsumptionId: input.dailyWaterConsumptionId,
          amountConsumedInMl: input.amountConsumedInMl,
          dateOfConsumption: input.dateOfConsumption,
        },
      })

      await tx.dailyWaterConsumption.update({
        where: { userId, id: input.dailyWaterConsumptionId },
        data: { consumedInMl: { increment: input.amountConsumedInMl } },
      })

      return waterConsumption
    })
  }
}
