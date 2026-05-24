import { Food } from 'generated/prisma/client'
import { FindAllFoodsInput, SaveFoodInput } from 'src/modules/foods/types'

export abstract class FoodsRepository {
  abstract findManyByIds(foodsIds: string[]): Promise<Food[]>
  abstract findOne(foodId: string): Promise<Food | null>
  abstract findAll(userId: string, input: FindAllFoodsInput): Promise<Food[]>
  abstract save(input: SaveFoodInput): Promise<Food>
}
