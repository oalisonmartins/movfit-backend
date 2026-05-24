import { Injectable } from '@nestjs/common'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { SearchFoodsInput, SearchFoodsOutput } from 'src/modules/foods/types'

@Injectable()
export class SearchFoodsUseCase {
  constructor(private readonly foodsRepository: FoodsRepository) {}

  async execute(input: SearchFoodsInput): Promise<SearchFoodsOutput> {
    const foods = await this.foodsRepository.findAll(input.userId, {
      limit: input.limit,
      offset: input.offset,
      isRecipe: input.isRecipe,
    })

    return {
      total: foods.length,
      foods: foods.map((food) => ({
        id: food.id,
        name: food.name,
        isRecipe: food.isRecipe,
        description: food.description,
        coverImageUrl: food.coverImageUrl,
        caloriePer100gInKcal: food.caloriePer100gInKcal,
        proteinPer100gInGrams: food.proteinPer100gInGrams,
        carbPer100gInGrams: food.carbPer100gInGrams,
        fatPer100gInGrams: food.fatPer100gInGrams,
      })),
    }
  }
}
