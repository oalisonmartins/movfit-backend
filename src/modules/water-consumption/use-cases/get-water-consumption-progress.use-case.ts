import { Injectable } from '@nestjs/common'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { toPercentage } from 'src/common/helpers/to-percentage.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'

@Injectable()
export class GetWaterConsumptionProgressUseCase {
  constructor(
    private readonly waterConsumptionRepo: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(userId: string) {
    const { timezone } = this.requestContext.getProfile
    const today = getTodayInTimezone(timezone)
    const todayWaterConsumptions = await this.waterConsumptionRepo.getHistory(userId, {
      fromDate: today,
      toDate: today,
    })
    const totalConsumedInMlToday = todayWaterConsumptions.reduce(
      (total, current) => total + current.amountConsumedInMl,
      0,
    )
    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption
    return {
      targetConsumptionInMl: dailyWaterConsumption.targetInMl,
      totalConsumedInMl: totalConsumedInMlToday,
      consumptionProgressPercent: toPercentage({
        goal: dailyWaterConsumption.targetInMl,
        current: totalConsumedInMlToday,
      }),
    }
  }
}
