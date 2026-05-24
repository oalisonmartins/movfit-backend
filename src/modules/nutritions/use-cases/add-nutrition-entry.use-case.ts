import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { NutritionEntryRepository } from 'src/modules/nutritions/repositories/nutrition-entry.repository'
import { AddNutritionEntryInput } from 'src/modules/nutritions/types/add-nutrition-entry.types'

@Injectable()
export class AddNutritionEntryUseCase {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly nutritionEntryRepository: NutritionEntryRepository,
  ) {}

  async execute(input: AddNutritionEntryInput) {
    const userId = this.requestContext.getUserId

    const newEntry = await this.nutritionEntryRepository.create(userId, {
      date: input.date,
      amountInGrams: input.amountInGrams,
      dietId: input.dietId,
      foodId: input.foodId,
      mealId: input.mealId,
    })

    return {
      id: newEntry.id,
      date: newEntry.date,
      foodCoverImageUrl: newEntry.food.coverImageUrl,
      carbInGrams: (newEntry.food.carbPer100gInGrams * newEntry.amountInGrams) / 100,
      fatInGrams: (newEntry.food.fatPer100gInGrams * newEntry.amountInGrams) / 100,
      proteinInGrams: (newEntry.food.proteinPer100gInGrams * newEntry.amountInGrams) / 100,
    }
  }
}
