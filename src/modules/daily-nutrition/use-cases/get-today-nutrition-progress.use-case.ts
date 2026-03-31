import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { toPercentage } from 'src/common/helpers/to-percentage.helper'
import { FindByUserIdInput } from 'src/common/types/find-by-user-id.type'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository'
import { GetTodayNutritionProgressOutput } from '../types/get-today-nutrition-progress.type'

@Injectable()
export class GetTodayNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepository: DailyNutritionRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: FindByUserIdInput): Promise<GetTodayNutritionProgressOutput> {
    const user = await this.usersRepository.findWithDietsAndTimezone({
      userId: input.userId,
    })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    if (!user.profile?.timezone) {
      throw new BadRequestException('Timezone is not defined.')
    }

    let todayNutrition = await this.dailyNutritionRepository.getTodayNutrition({
      userId: input.userId,
      timezone: user.profile.timezone,
    })

    if (!todayNutrition) {
      todayNutrition = await this.dailyNutritionRepository.upsertTodayNutrition({
        userId: input.userId,
        timezone: user.profile.timezone,
      })
    }

    if (user.diets.length === 0) {
      throw new NotFoundException('Diets not found.')
    }

    const activeDiet = user.diets.find((diet) => diet.isActive)

    if (!activeDiet) {
      throw new BadRequestException('Any active diet found.')
    }

    const todayNutritionProgress = {
      carbs: {
        goalInGrams: activeDiet.carbsInGrams,
        totalConsumedInGrams: todayNutrition.carbsInGrams,
        totalConsumedInPercentage: toPercentage({
          goal: activeDiet.carbsInGrams,
          current: todayNutrition.carbsInGrams,
        }),
      },
      proteins: {
        goalInGrams: activeDiet.proteinsInGrams,
        totalConsumedInGrams: todayNutrition.proteinsInGrams,
        totalConsumedInPercentage: toPercentage({
          goal: activeDiet.proteinsInGrams,
          current: todayNutrition.proteinsInGrams,
        }),
      },
      fats: {
        goalInGrams: activeDiet.fatsInGrams,
        totalConsumedInGrams: todayNutrition.fatsInGrams,
        totalConsumedInPercentage: toPercentage({
          goal: activeDiet.fatsInGrams,
          current: todayNutrition.fatsInGrams,
        }),
      },
    }

    return todayNutritionProgress
  }
}
