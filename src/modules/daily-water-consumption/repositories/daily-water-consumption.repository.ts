import { Injectable } from '@nestjs/common'
import { DailyWaterConsumption } from 'generated/prisma/client'
import { UpsertDailyWaterConsumptionInput } from '../types/upsert-consumption.type'

@Injectable()
export abstract class DailyWaterConsumptionRepository {
  abstract get(userId: string): Promise<DailyWaterConsumption | null>
  abstract upsert(
    userId: string,
    input: UpsertDailyWaterConsumptionInput,
  ): Promise<DailyWaterConsumption>
}
