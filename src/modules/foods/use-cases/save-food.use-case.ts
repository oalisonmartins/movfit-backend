import { Injectable } from '@nestjs/common'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { SaveFoodInput, SaveFoodOutput } from 'src/modules/foods/types'

@Injectable()
export class SaveFoodUseCase {
  constructor(private readonly foodsRepository: FoodsRepository) {}

  async execute(input: SaveFoodInput): Promise<SaveFoodOutput> {
    const savedFood = await this.foodsRepository.save({
      userId: input.userId,
      name: input.name,
      source: input.source,
      isRecipe: input.isRecipe ?? false,
      caloriePer100gInKcal: input.caloriePer100gInKcal,
      carbPer100gInGrams: input.carbPer100gInGrams,
      fatPer100gInGrams: input.fatPer100gInGrams,
      proteinPer100gInGrams: input.proteinPer100gInGrams,
    })

    return {
      id: savedFood.id,
      name: savedFood.name,
      source: savedFood.source,
      isRecipe: savedFood.isRecipe,
      description: savedFood.description,
      coverImageUrl: savedFood.coverImageUrl,
      caloriePer100gInKcal: savedFood.caloriePer100gInKcal,
      proteinPer100gInGrams: savedFood.proteinPer100gInGrams,
      carbPer100gInGrams: savedFood.carbPer100gInGrams,
      fatPer100gInGrams: savedFood.fatPer100gInGrams,
    }
  }
}
