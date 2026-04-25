import { Injectable } from '@nestjs/common'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { RegisterWaterConsumptionInput } from '../types/register-water-consumption.types'

@Injectable()
export class RegisterWaterConsumptionUseCase {
  constructor(
    private readonly waterConsumptionRepo: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: RegisterWaterConsumptionInput) {
    const userId = this.requestContext.getUserId
    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption

    const { timezone } = this.requestContext.getProfile
    const todayInTimezone = getTodayInTimezone(timezone)

    const updatedConsumption = await this.waterConsumptionRepo.register(userId, {
      dailyWaterConsumptionId: dailyWaterConsumption.id,
      amountConsumedInMl: input.amountConsumedInMl,
      dateOfConsumption: todayInTimezone,
    })

    return {
      id: updatedConsumption.id,
      amountConsumedInMl: updatedConsumption.amountConsumedInMl,
      dateOfConsumption: updatedConsumption.dateOfConsumption,
    }
  }
}
