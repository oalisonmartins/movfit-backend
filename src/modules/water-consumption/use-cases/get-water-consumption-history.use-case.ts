import { Injectable } from '@nestjs/common'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { GetWaterConsumptionHistoryRequest } from '../types/get-water-consumption-history.type'

@Injectable()
export class GetWaterConsumptionHistoryUseCase {
  constructor(private readonly waterConsumptionRepo: WaterConsumptionRepository) {}

  async execute(userId: string, input: GetWaterConsumptionHistoryRequest) {
    const waterConsumptionHistory = await this.waterConsumptionRepo.getHistory(userId, input)
    if (waterConsumptionHistory.length === 0) {
      return []
    }
    return waterConsumptionHistory.map((waterConsumption) => ({
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountConsumedInMl,
      dateOfConsumption: waterConsumption.dateOfConsumption,
    }))
  }
}
