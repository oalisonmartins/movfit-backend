import { Injectable } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { FindAllFoodsInput } from 'src/modules/foods/types/find-all-foods.types'
import { SaveFoodInput } from 'src/modules/foods/types/save-food.types'

@Injectable()
export class PrismaFoodsRepository extends BaseRepository implements FoodsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(foodId: string): Promise<Food | null> {
    return await this.db.food.findFirst({
      where: { id: foodId },
    })
  }

  async findAll(userId: string, input: FindAllFoodsInput): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { userId, isRecipe: input.isRecipe },
      orderBy: {
        name: 'asc',
      },
      take: input.limit,
      skip: input.offset,
    })
  }

  async findManyByIds(foodsIds: string[]): Promise<Food[]> {
    return await this.db.food.findMany({
      where: { id: { in: foodsIds } },
    })
  }

  async save(input: SaveFoodInput): Promise<Food> {
    return await this.db.food.create({
      data: {
        userId: input.userId,
        name: input.name,
        description: input.description,
        coverImageUrl: input.coverImageUrl,
        caloriePer100gInKcal: input.caloriePer100gInKcal,
        carbPer100gInGrams: input.carbPer100gInGrams,
        proteinPer100gInGrams: input.proteinPer100gInGrams,
        fatPer100gInGrams: input.fatPer100gInGrams,
        source: input.source,
        isRecipe: input.isRecipe,
      },
    })
  }
}
