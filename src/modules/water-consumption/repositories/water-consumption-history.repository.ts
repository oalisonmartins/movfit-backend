import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistory } from 'generated/prisma/client'
import {
  GetTotalConsumptionInput,
  GetTotalConsumptionOutput,
} from '../types/get-total-consumption.type'
import { GetConsumptionHistoryInput } from '../types/get-water-consumption-history.type'
import { RegisterWaterConsumptionInput } from '../types/register-water-consumption.type'

@Injectable()
export abstract class WaterConsumptionHistoryRepository {
  abstract registerWaterConsumption(input: RegisterWaterConsumptionInput): Promise<void>
  abstract getTotalConsumption(input: GetTotalConsumptionInput): Promise<GetTotalConsumptionOutput>
  abstract getConsumptionHistory(
    input: GetConsumptionHistoryInput,
  ): Promise<WaterConsumptionHistory[] | null>
}
