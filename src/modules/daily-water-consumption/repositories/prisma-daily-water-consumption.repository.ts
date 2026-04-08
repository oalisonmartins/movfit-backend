import { Injectable } from '@nestjs/common'
import { DailyWaterConsumption } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UpsertDailyWaterConsumptionInput } from '../types/upsert-consumption.type'
import { DailyWaterConsumptionRepository } from './daily-water-consumption.repository'

@Injectable()
export class PrismaDailyWaterConsumptionRepository implements DailyWaterConsumptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string): Promise<DailyWaterConsumption | null> {
    const dailyWaterConsumption = await this.prisma.dailyWaterConsumption.findFirst({
      where: { userId: userId },
    })
    if (!dailyWaterConsumption) {
      return null
    }
    return dailyWaterConsumption
  }

  async upsert(
    userId: string,
    input: UpsertDailyWaterConsumptionInput,
  ): Promise<DailyWaterConsumption> {
    const dailyWaterConsumption = await this.prisma.dailyWaterConsumption.upsert({
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
    return dailyWaterConsumption
  }
}
