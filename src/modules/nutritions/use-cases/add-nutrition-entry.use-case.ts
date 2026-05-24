import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { MealsRepository } from 'src/modules/meals/repositories/meals.repository'
import { NutritionEntryRepository } from 'src/modules/nutritions/repositories/nutrition-entry.repository'
import { AddNutritionEntryInput } from 'src/modules/nutritions/types/add-nutrition-entry.types'

@Injectable()
export class AddNutritionEntryUseCase {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly nutritionEntryRepository: NutritionEntryRepository,
    private readonly mealsRepository: MealsRepository,
    private readonly dietsRepository: DietsRepository,
  ) {}

  async execute(input: AddNutritionEntryInput) {
    const { timezone } = this.requestContext.getProfile
    const userId = this.requestContext.getUserId

    let mealId: string
    let dietId: string

    if (!input.mealId) {
      const now = new Date()
      const nowInSeconds = now
        .toLocaleTimeString('pt-BR', { timeZone: timezone, hour12: false })
        .split(':')
        .reduce((acc, val, i) => acc + Number(val) * [3600, 60, 1][i], 0)

      const currentMeal = await this.mealsRepository.findOne(userId, nowInSeconds)

      if (!currentMeal) {
        throw new HttpException(
          {
            message: 'Refeição não encontrada',
            code: 'MEAL_NOT_FOUD',
          },
          HttpStatus.NOT_FOUND,
        )
      }

      mealId = currentMeal.id
    } else {
      mealId = input.mealId
    }

    if (!input.dietId) {
      const mealDiet = await this.dietsRepository.findOneByMealAndUserId(mealId, userId)

      if (!mealDiet) {
        throw new HttpException(
          {
            message: 'Nenhuma dieta encontrada',
            code: 'DIET_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        )
      }

      dietId = mealDiet.id
    } else {
      dietId = input.dietId
    }

    const newEntry = await this.nutritionEntryRepository.create(userId, {
      date: input.date,
      amountInGrams: input.amountInGrams,
      foodId: input.foodId,
      dietId,
      mealId,
    })

    return {
      id: newEntry.id,
      date: newEntry.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      foodCoverImageUrl: newEntry.food.coverImageUrl,
      carbInGrams: (newEntry.food.carbPer100gInGrams * newEntry.amountInGrams) / 100,
      fatInGrams: (newEntry.food.fatPer100gInGrams * newEntry.amountInGrams) / 100,
      proteinInGrams: (newEntry.food.proteinPer100gInGrams * newEntry.amountInGrams) / 100,
    }
  }
}
