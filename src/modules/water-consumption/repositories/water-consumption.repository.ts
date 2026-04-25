import { Injectable } from '@nestjs/common'
import { WaterConsumption } from 'generated/prisma/client'
import { GetWaterConsumptionHistoryInput } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionRepositoryInput } from '../types/register-water-consumption.types'

@Injectable()
export abstract class WaterConsumptionRepository {
  abstract history(userId: string, input: GetWaterConsumptionHistoryInput): Promise<WaterConsumption[]>
  abstract register(userId: string, input: RegisterWaterConsumptionRepositoryInput): Promise<WaterConsumption>
}
