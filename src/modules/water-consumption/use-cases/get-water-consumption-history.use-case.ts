import { Injectable } from '@nestjs/common'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { GetWaterConsumptionHistoryInput } from '../types/get-water-consumption-history.type'

@Injectable()
export class GetWaterConsumptionHistoryUseCase {
  constructor(private readonly waterConsumptionRepo: WaterConsumptionRepository) {}

  async execute(userId: string, input: GetWaterConsumptionHistoryInput) {
    const consumptionHistory = await this.waterConsumptionRepo.history(userId, input)

    if (consumptionHistory.length === 0) {
      return []
    }

    return consumptionHistory.map((waterConsumption) => ({
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountConsumedInMl,
      dateOfConsumption: waterConsumption.dateOfConsumption,
    }))
  }
}
