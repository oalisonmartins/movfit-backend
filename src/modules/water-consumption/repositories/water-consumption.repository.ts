import { Injectable } from '@nestjs/common'
import {
  UpsertWaterConsumptionInputData,
  WaterConsumptionData,
} from '../types/water-consumption.types'

@Injectable()
export abstract class WaterConsumptionRepository {
  abstract getWaterConsumption(userId: string): Promise<WaterConsumptionData | null>

  abstract upsertWaterConsumption(
    data: UpsertWaterConsumptionInputData,
  ): Promise<WaterConsumptionData>
}
