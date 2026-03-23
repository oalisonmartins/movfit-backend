import { BadRequestException, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { RegisterWaterConsumptionDto } from '../dtos/register-water-consumption.dto'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { WaterConsumptionHistoryRepository } from '../repositories/water-consumption-history.repository'

@Injectable()
export class RegisterWaterConsumptionUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly waterConsumptionHistoryRepository: WaterConsumptionHistoryRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(data: RegisterWaterConsumptionDto) {
    const userId = this.requestContext.getUserId
    const waterConsumption = await this.waterConsumptionRepository.getWaterConsumption(userId)

    if (!waterConsumption) {
      throw new BadRequestException('Water consumption is not found.')
    }

    await this.waterConsumptionHistoryRepository.registerConsumption({
      userId,
      amountConsumedInMl: data.amountConsumedInMl,
      consumptionDate: data.consumptionDate,
    })

    const { todayTotalConsumptionInMl } =
      await this.waterConsumptionHistoryRepository.getTotalConsumption({
        userId,
        date: data.consumptionDate,
      })

    await this.waterConsumptionRepository.upsertWaterConsumption({
      userId,
      dailyConsumptionInMl: waterConsumption.goalDailyConsumptionInMl,
      todayTotalConsumptionInMl,
    })
  }
}
