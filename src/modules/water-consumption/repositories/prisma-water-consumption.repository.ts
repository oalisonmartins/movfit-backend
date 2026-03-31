import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  GetWaterConsumptionInput,
  GetWaterConsumptionOutput,
} from '../types/get-water-consumption.type'
import {
  UpsertWaterConsumptionInput,
  UpsertWaterConsumptionOutput,
} from '../types/upsert-consumption.type'
import { WaterConsumptionRepository } from './water-consumption.repository'

@Injectable()
export class PrismaWaterConsumptionRepository implements WaterConsumptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getWaterConsumption(
    input: GetWaterConsumptionInput,
  ): Promise<GetWaterConsumptionOutput | null> {
    const waterConsumption = await this.prisma.waterConsumption.findFirst({
      where: {
        userId: input.userId,
        date: input.date,
      },
      select: {
        id: true,
        date: true,
        goalInMl: true,
        consumedInMl: true,
      },
    })
    return waterConsumption
  }

  async upsertWaterConsumption(
    input: UpsertWaterConsumptionInput,
  ): Promise<UpsertWaterConsumptionOutput> {
    const newWaterConsumption = await this.prisma.waterConsumption.upsert({
      where: {
        userId_date: {
          userId: input.userId,
          date: input.consumptionDate,
        },
      },
      create: {
        userId: input.userId,
        date: input.consumptionDate,
        goalInMl: input.dailyConsumptionInMl,
      },
      update: {
        goalInMl: input.dailyConsumptionInMl,
        consumedInMl: input.todayTotalConsumptionInMl,
      },
      select: {
        id: true,
        date: true,
        goalInMl: true,
        consumedInMl: true,
      },
    })
    return newWaterConsumption
  }
}
