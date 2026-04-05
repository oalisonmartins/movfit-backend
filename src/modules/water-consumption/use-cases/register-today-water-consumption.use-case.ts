import { BadRequestException, Injectable } from '@nestjs/common'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { WaterConsumptionRepository } from '../repositories/water-consumption.repository'
import { WaterConsumptionHistoryRepository } from '../repositories/water-consumption-history.repository'
import { RegisterTodayWaterConsumptionInput } from '../types/register-today-water-consumption.type'

@Injectable()
export class RegisterTodayWaterConsumptionUseCase {
  constructor(
    private readonly waterConsumptionRepository: WaterConsumptionRepository,
    private readonly waterConsumptionHistoryRepository: WaterConsumptionHistoryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: RegisterTodayWaterConsumptionInput): Promise<void> {
    const user = await this.usersRepository.findWithTimezone(input.userId)

    if (!user?.profile) {
      throw new BadRequestException('Complete your profile and try again.')
    }

    const today = getTodayInTimezone(user.profile.timezone)

    const todayWaterConsumption = await this.waterConsumptionRepository.getWaterConsumption({
      userId: input.userId,
      date: today,
    })

    if (!todayWaterConsumption) {
      throw new BadRequestException('Today water consumption not found.')
    }

    await this.waterConsumptionHistoryRepository.registerWaterConsumption({
      userId: input.userId,
      waterConsumptionId: todayWaterConsumption.id,
      amountConsumedInMl: input.amountConsumedInMl,
      consumptionDate: today,
    })

    const todayTotalConsumption = await this.waterConsumptionHistoryRepository.getTotalConsumption({
      userId: input.userId,
      date: today,
    })

    await this.waterConsumptionRepository.upsertWaterConsumption({
      userId: input.userId,
      consumptionDate: today,
      todayTotalConsumptionInMl: todayTotalConsumption ?? 0,
    })
  }
}
