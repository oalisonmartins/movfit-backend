import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository'
import { UpdateTodayNutritionInput, UpdateTodayNutritionOutput } from '../types/update-today-nutrition.type'

@Injectable()
export class UpdateTodayNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepo: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: UpdateTodayNutritionInput): Promise<UpdateTodayNutritionOutput> {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile

    const updatedTodayDailyNutrition = await this.dailyNutritionRepo.upsert({
      userId,
      timezone,
      carbsInGrams: input.carbsInGrams,
      fatsInGrams: input.fatsInGrams,
      proteinsInGrams: input.proteinsInGrams,
    })

    return {
      id: updatedTodayDailyNutrition.id,
      day: updatedTodayDailyNutrition.day,
      carbsInGrams: updatedTodayDailyNutrition.carbsInGrams,
      fatsInGrams: updatedTodayDailyNutrition.fatsInGrams,
      proteinsInGrams: updatedTodayDailyNutrition.proteinsInGrams,
    }
  }
}
