import { Injectable } from '@nestjs/common'
import { WaterConsumptionHistoryRepository } from '../repositories/water-consumption-history.repository'
import {
  GetConsumptionHistoryInput,
  GetConsumptionHistoryOutput,
} from '../types/get-water-consumption-history.type'

@Injectable()
export class GetWaterConsumptionHistoryUseCase {
  constructor(
    private readonly waterConsumptionHistoryRepository: WaterConsumptionHistoryRepository,
  ) {}

  async execute(input: GetConsumptionHistoryInput): Promise<GetConsumptionHistoryOutput[] | null> {
    const waterConsumptionHistory =
      await this.waterConsumptionHistoryRepository.getConsumptionHistory({
        userId: input.userId,
      })

    if (!waterConsumptionHistory) {
      return null
    }

    return waterConsumptionHistory.map((waterConsumption) => ({
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountInMl,
      date: waterConsumption.date,
    }))
  }
}
