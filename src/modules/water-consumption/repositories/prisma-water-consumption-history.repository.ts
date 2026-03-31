import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistory } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  GetTotalConsumptionInput,
  GetTotalConsumptionOutput,
} from '../types/get-total-consumption.type'
import { GetConsumptionHistoryInput } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionInput } from '../types/register-water-consumption.type'
import { WaterConsumptionHistoryRepository } from './water-consumption-history.repository'

@Injectable()
export class PrismaWaterConsumptionHistoryRepository implements WaterConsumptionHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getConsumptionHistory({
    userId,
  }: GetConsumptionHistoryInput): Promise<WaterConsumptionHistory[] | null> {
    const waterConsumptionHistory = await this.prisma.waterConsumptionHistory.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
    })
    return waterConsumptionHistory
  }

  async getTotalConsumption(input: GetTotalConsumptionInput): Promise<GetTotalConsumptionOutput> {
    const totalConsumption = await this.prisma.waterConsumptionHistory.aggregate({
      where: {
        userId: input.userId,
        date: input.date,
      },
      _sum: { amountInMl: true },
    })
    return totalConsumption._sum.amountInMl
  }

  async registerWaterConsumption(input: RegisterWaterConsumptionInput): Promise<void> {
    await this.prisma.waterConsumptionHistory.create({
      data: {
        userId: input.userId,
        waterConsumptionId: input.waterConsumptionId,
        amountInMl: input.amountConsumedInMl,
        date: input.consumptionDate,
      },
    })
  }
}
