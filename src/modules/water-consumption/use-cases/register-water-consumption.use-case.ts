import { Injectable } from '@nestjs/common'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { RegisterWaterConsumptionRequest } from '../types/register-water-consumption.type'

@Injectable()
export class RegisterWaterConsumptionUseCase {
  constructor(
    private readonly waterConsumptionRepo: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: RegisterWaterConsumptionRequest) {
    const dailyWaterConsumption = this.requestContext.getDailyWaterConsumption
    const { timezone } = this.requestContext.getProfile
    const userId = this.requestContext.getUserId
    const today = getTodayInTimezone(timezone)
    const waterConsumption = await this.waterConsumptionRepo.register(userId, {
      amountConsumedInMl: input.amountConsumedInMl,
      dailyWaterConsumptionId: dailyWaterConsumption.id,
      dateOfConsumption: today,
    })
    return {
      id: waterConsumption.id,
      amountConsumedInMl: waterConsumption.amountConsumedInMl,
      dateOfConsumption: waterConsumption.dateOfConsumption,
    }
  }
}
