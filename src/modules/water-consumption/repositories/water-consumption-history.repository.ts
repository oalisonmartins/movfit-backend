import { Injectable } from '@nestjs/common'
import {
  GetTotalWaterConsumptionData,
  GetTotalWaterConsumptionReturnData,
  RegisterWaterConsumptionData,
} from '../types/water-consumption.types'

@Injectable()
export abstract class WaterConsumptionHistoryRepository {
  abstract registerConsumption(data: RegisterWaterConsumptionData): Promise<void>

  abstract getTotalConsumption(
    data: GetTotalWaterConsumptionData,
  ): Promise<GetTotalWaterConsumptionReturnData>
}
