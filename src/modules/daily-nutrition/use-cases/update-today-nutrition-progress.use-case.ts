import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository'
import {
  UpdateTodayNutritionInput,
  UpdateTodayNutritionOutput,
} from '../types/update-today-nutrition.type'

@Injectable()
export class UpdateTodayNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepository: DailyNutritionRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: UpdateTodayNutritionInput): Promise<UpdateTodayNutritionOutput> {
    const user = await this.usersRepository.findWithTimezone({
      userId: input.userId,
    })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    if (!user.profile?.timezone) {
      throw new BadRequestException('Timezone is not defined.')
    }

    return await this.dailyNutritionRepository.upsertTodayNutrition({
      userId: input.userId,
      timezone: user.profile.timezone,
      carbsInGrams: input.carbsInGrams,
      fatsInGrams: input.fatsInGrams,
      proteinsInGrams: input.proteinsInGrams,
    })
  }
}
