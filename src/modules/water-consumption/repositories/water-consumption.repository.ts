import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionInput } from '../types/register-water-consumption.type'

@Injectable()
export abstract class WaterConsumptionRepository {
  abstract getHistory(
    userId: string,
    input: GetWaterConsumptionHistoryRequest,
  ): Promise<WaterConsumption[]>
  abstract register(userId: string, input: RegisterWaterConsumptionInput): Promise<WaterConsumption>
}
