import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
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

  async findOne(userId: string, scheduledTimeInSeconds: number): Promise<Meal | null> {
    return await this.db.meal.findFirst({
      where: {
        userId,
        scheduledTimeInSeconds: {
          lte: scheduledTimeInSeconds,
        },
        diet: {
          isActive: true,
        },
      },
      orderBy: {
        scheduledTimeInSeconds: 'desc',
      },
    })
  }

  async create(input: CreateMealInput): Promise<Meal> {
    return await this.db.meal.create({
      data: {
        userId: input.userId,
        dietId: input.dietId,
        name: input.name,
        scheduledTimeInSeconds: input.scheduledTimeInSeconds,
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
