import { BadRequestException, Injectable } from '@nestjs/common'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { toPercentage } from 'src/common/helpers/to-percentage.helper'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { calculateDailyConsumption } from 'src/modules/water-consumption/helpers/calculate-daily-consumption.helper'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import {
  GetTodayWaterConsumptionProgressInput,
  GetTodayWaterConsumptionProgressOutput,
} from '../types/get-today-water-consumption-progress.type'

@Injectable()
export class GetTodayWaterConsumptionProgressUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    input: GetTodayWaterConsumptionProgressInput,
  ): Promise<GetTodayWaterConsumptionProgressOutput> {
    const user = await this.usersRepository.findWithProfile(input.userId)

    if (!user?.profile) {
      throw new BadRequestException('Complete your profile and try again.')
    }

    const today = getTodayInTimezone(user.profile.timezone)

    const currentWaterConsumption = await this.waterConsumptionRepository.getWaterConsumption({
      userId: input.userId,
      date: today,
    })

    if (currentWaterConsumption) {
      return {
        goalDailyConsumptionInMl: currentWaterConsumption.goalInMl,
        todayConsumptionInMl: currentWaterConsumption.consumedInMl,
        todayConsumptionInPercentage: toPercentage({
          goal: currentWaterConsumption.goalInMl,
          current: currentWaterConsumption.consumedInMl,
        }),
      }
    }

    const dailyConsumptionInMl = calculateDailyConsumption({
      goal: user.profile.goal,
      weightInGrams: user.profile.weightInGrams,
      biologicalSex: user.profile.biologicalSex,
      birthDate: user.profile.birthDate,
    })

    const todayWaterConsumption = await this.waterConsumptionRepository.upsertWaterConsumption({
      userId: input.userId,
      dailyConsumptionInMl,
      consumptionDate: today,
      todayTotalConsumptionInMl: 0,
    })

    return {
      goalDailyConsumptionInMl: todayWaterConsumption.goalInMl,
      todayConsumptionInMl: todayWaterConsumption.consumedInMl,
      todayConsumptionInPercentage: toPercentage({
        goal: todayWaterConsumption.goalInMl,
        current: todayWaterConsumption.consumedInMl,
      }),
    }
  }
}
