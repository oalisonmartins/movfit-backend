import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  GetTotalWaterConsumptionData,
  GetTotalWaterConsumptionReturnData,
  RegisterWaterConsumptionData,
} from '../types/water-consumption.types'
import { WaterConsumptionHistoryRepository } from './water-consumption-history.repository'

@Injectable()
export class PrismaWaterConsumptionHistoryRepository implements WaterConsumptionHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalConsumption(
    data: GetTotalWaterConsumptionData,
  ): Promise<GetTotalWaterConsumptionReturnData> {
    const result = await this.prisma.waterConsumptionHistory.aggregate({
      where: {
        userId: data.userId,
        date: data.date,
      },
      _sum: {
        amountInMl: true,
      },
    })

    return {
      todayTotalConsumptionInMl: result._sum.amountInMl as number,
    }
  }

  async registerConsumption(data: RegisterWaterConsumptionData): Promise<void> {
    await this.prisma.waterConsumptionHistory.create({
      data: {
        userId: data.userId,
        amountInMl: data.amountConsumedInMl,
        date: data.consumptionDate,
      },
    })
  }
}
