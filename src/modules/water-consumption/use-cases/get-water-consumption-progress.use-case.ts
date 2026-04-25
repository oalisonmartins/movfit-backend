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

  async execute() {
    const userId = this.requestContext.getUserId

    const { timezone } = this.requestContext.getProfile
    const todayInTimezone = getTodayInTimezone(timezone)

    const todayConsumptionsInMl = await this.waterConsumptionRepo.history(userId, {
      fromDate: todayInTimezone,
      toDate: todayInTimezone,
    })

    const todayTotalConsumptionInMl = todayConsumptionsInMl.reduce(
      (total, current) => total + current.amountConsumedInMl,
      0,
    )

    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption

    return {
      targetConsumptionInMl: dailyWaterConsumption.targetInMl,
      totalConsumptionInMl: todayTotalConsumptionInMl,
      progress: toPercentage({
        goal: dailyWaterConsumption.targetInMl,
        current: todayTotalConsumptionInMl,
      }),
    }
  }
}
