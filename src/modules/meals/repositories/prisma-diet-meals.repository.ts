import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { MealsRepository } from 'src/modules/meals/repositories/meals.repository'
import { CreateMealInput } from 'src/modules/meals/types'

@Injectable()
export class PrismaMealsRepository extends BaseRepository implements MealsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(input: CreateMealInput): Promise<Meal> {
    return await this.db.meal.create({
      data: {
        userId: input.userId,
        dietId: input.dietId,
        name: input.name,
        scheduleTimeInSeconds: input.scheduleTimeInSeconds,
        foods: {
          createMany: {
            data: input.foods.map((mealFood) => ({
              foodId: mealFood.foodId,
              amountInGrams: mealFood.amountInGrams,
            })),
          },
        },
      },
    })
  }
}
