import { BadRequestException, Injectable } from '@nestjs/common'
import { toPercentage } from 'src/common/helpers/to-percentage.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { calculateUserDailyConsumption } from 'src/modules/water-consumption/helpers/calculate-user-daily-consumption.helper'
import { GetWaterConsumptionProgressDto } from '../dtos/get-water-consumption-progress.dto'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { WaterConsumptionData } from '../types/water-consumption.types'

@Injectable()
export class GetWaterConsumptionProgressUseCase {
  constructor(
    private readonly repository: WaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  private formatAsDto(input: WaterConsumptionData): GetWaterConsumptionProgressDto {
    return {
      goalDailyConsumptionInMl: input.goalDailyConsumptionInMl,
      todayConsumptionInMl: input.todayConsumptionInMl,
      todayConsumptionInPercentage: toPercentage({
        goal: input.goalDailyConsumptionInMl,
        current: input.todayConsumptionInMl,
      }),
    }
  }

  async execute(): Promise<GetWaterConsumptionProgressDto> {
    const user = this.requestContext.getUser

    if (user.waterConsumption) {
      return this.formatAsDto({
        goalDailyConsumptionInMl: user.waterConsumption.goalInMl,
        todayConsumptionInMl: user.waterConsumption.consumedInMl,
      })
    }

    if (user.biologicalSex === null || user.goal === null || user.weightInGrams === null) {
      throw new BadRequestException('Incomplete profile.')
    }

    const { dailyConsumptionInMl } = calculateUserDailyConsumption({
      goal: user.goal,
      weightInGrams: user.weightInGrams,
      biologicalSex: user.biologicalSex,
      birthDate: user.birthDate,
    })

    const waterIngestion = await this.repository.upsertWaterConsumption({
      userId: user.id,
      dailyConsumptionInMl,
    })

    return this.formatAsDto({
      goalDailyConsumptionInMl: waterIngestion.goalDailyConsumptionInMl,
      todayConsumptionInMl: waterIngestion.todayConsumptionInMl,
    })
  }
}
