import { Injectable } from '@nestjs/common'
import {
  GetWaterConsumptionInput,
  GetWaterConsumptionOutput,
} from '../types/get-water-consumption.type'
import {
  UpsertWaterConsumptionInput,
  UpsertWaterConsumptionOutput,
} from '../types/upsert-consumption.type'

@Injectable()
export abstract class WaterConsumptionRepository {
  abstract getWaterConsumption(
    input: GetWaterConsumptionInput,
  ): Promise<GetWaterConsumptionOutput | null>
  abstract upsertWaterConsumption(
    input: UpsertWaterConsumptionInput,
  ): Promise<UpsertWaterConsumptionOutput>
}
