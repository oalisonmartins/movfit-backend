import { Injectable } from '@nestjs/common'
import { WaterConsumptionSelect } from 'generated/prisma/models'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  UpsertWaterConsumptionInputData,
  WaterConsumptionData,
} from '../types/water-consumption.types'
import { WaterConsumptionRepository } from './water-consumption.repository'

@Injectable()
export class PrismaWaterConsumptionRepository implements WaterConsumptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly waterConsumptionSelect = {
    goalInMl: true,
    consumedInMl: true,
  } satisfies WaterConsumptionSelect

  async getWaterConsumption(userId: string): Promise<WaterConsumptionData | null> {
    const result = await this.prisma.waterConsumption.findFirst({
      where: { userId },
      select: this.waterConsumptionSelect,
    })

    if (!result) {
      return null
    }

    return {
      goalDailyConsumptionInMl: result.goalInMl,
      todayConsumptionInMl: result.consumedInMl,
    }
  }

  async upsertWaterConsumption(
    data: UpsertWaterConsumptionInputData,
  ): Promise<WaterConsumptionData> {
    const result = await this.prisma.waterConsumption.upsert({
      where: { userId: data.userId },
      create: {
        goalInMl: data.dailyConsumptionInMl,
        userId: data.userId,
      },
      update: {
        goalInMl: data.dailyConsumptionInMl,
        consumedInMl: data.todayTotalConsumptionInMl,
      },
      select: this.waterConsumptionSelect,
    })

    return {
      goalDailyConsumptionInMl: result.goalInMl,
      todayConsumptionInMl: result.consumedInMl,
    }
  }
}
