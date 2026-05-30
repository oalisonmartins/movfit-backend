import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { NutritionLogRepository } from 'src/modules/nutrition/log/repositories/log.repository'
import { GetNutritionProgressInput } from 'src/modules/nutrition/log/types/get-nutrition-progress.types'

@Injectable()
export class GetNutritionProgressUseCase {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly nutritionLogRepository: NutritionLogRepository,
  ) {}

  async execute(input: GetNutritionProgressInput) {
    const userId = this.requestContext.getUserId
    const { totalCalorieInKcal, totalCarbInGrams, totalFatInGrams, totalProteinInGrams } =
      this.requestContext.getActiveDiet

    let nutritionLog = await this.nutritionLogRepository.findOne(userId, input.date)

    if (!nutritionLog) {
      nutritionLog = await this.nutritionLogRepository.create(userId, input.date)
    }

    const nutritionProgress = {
      calorie: {
        target: totalCalorieInKcal,
        consumed: nutritionLog.calorieInKcal,
        progress: Number(((nutritionLog.calorieInKcal / totalCalorieInKcal) * 100).toFixed(2)),
      },
      protein: {
        target: totalProteinInGrams,
        consumed: nutritionLog.proteinInGrams,
        progress: Number(((nutritionLog.proteinInGrams / totalProteinInGrams) * 100).toFixed(2)),
      },
      carb: {
        target: totalCarbInGrams,
        consumed: nutritionLog.carbInGrams,
        progress: Number(((nutritionLog.carbInGrams / totalCarbInGrams) * 100).toFixed(2)),
      },
      fat: {
        target: totalFatInGrams,
        consumed: nutritionLog.fatInGrams,
        progress: Number(((nutritionLog.fatInGrams / totalFatInGrams) * 100).toFixed(2)),
      },
    }

    return nutritionProgress
  }
}
