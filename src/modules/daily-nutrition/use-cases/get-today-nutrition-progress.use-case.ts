import { Injectable } from '@nestjs/common'
import { toPercentage } from 'src/common/helpers/to-percentage.helper'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository'
import { GetTodayNutritionProgressOutput } from '../types/get-today-nutrition-progress.type'

@Injectable()
export class GetTodayNutritionProgressUseCase {
  constructor(
    private readonly dailyNutritionRepo: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<GetTodayNutritionProgressOutput> {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile
    const activeDiet = this.requestContext.getActiveDiet

    const {
      totalCarbsInGrams: targetCarbsInGrams,
      totalProteinsInGrams: targetProteinsInGrams,
      totalFatsInGrams: targetFatsInGrams,
    } = activeDiet

    let todayNutrition = await this.dailyNutritionRepo.get({ userId, timezone })

    if (!todayNutrition) {
      todayNutrition = await this.dailyNutritionRepo.upsert({ userId, timezone })
    }

    const {
      carbsInGrams: totalCarbsConsumptionInGrams,
      proteinsInGrams: totalProteinsConsumptionInGrams,
      fatsInGrams: totalFatsConsumptionInGrams,
    } = todayNutrition

    return {
      carbs: {
        targetInGrams: targetCarbsInGrams,
        totalConsumptionInGrams: totalCarbsConsumptionInGrams,
        progress: toPercentage(targetCarbsInGrams, totalCarbsConsumptionInGrams),
      },
      proteins: {
        targetInGrams: targetProteinsInGrams,
        totalConsumptionInGrams: totalProteinsConsumptionInGrams,
        progress: toPercentage(targetProteinsInGrams, totalProteinsConsumptionInGrams),
      },
      fats: {
        targetInGrams: targetFatsInGrams,
        totalConsumptionInGrams: totalFatsConsumptionInGrams,
        progress: toPercentage(targetFatsInGrams, totalFatsConsumptionInGrams),
      },
    }
  }
}
