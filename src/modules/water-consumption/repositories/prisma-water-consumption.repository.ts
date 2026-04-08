import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionInput } from '../types/register-water-consumption.type'
import { WaterConsumptionRepository } from './water-consumption.repository'

@Injectable()
export class PrismaWaterConsumptionRepository implements WaterConsumptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory(
    userId: string,
    input: GetWaterConsumptionHistoryRequest,
  ): Promise<WaterConsumption[]> {
    const waterConsumptions = await this.prisma.waterConsumption.findMany({
      where: {
        userId,
        dateOfConsumption: {
          gte: input.fromDate,
          lte: input.toDate,
        },
      },
    })
    return waterConsumptions
  }

  async register(userId: string, input: RegisterWaterConsumptionInput): Promise<WaterConsumption> {
    const waterConsumption = await this.prisma.$transaction(async (tx) => {
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
    return waterConsumption
  }
}
