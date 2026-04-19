import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CreateMealInput } from '../types/create-meal.type'
import { MealsRepository } from './meals.repository'

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
        dietId: input.dietId,
        name: input.name,
        timeInMinutes: input.timeInMinutes,
        totalCaloriesInKcal: input.totalCaloriesInKcal,
        totalCarbsInGrams: input.totalCarbsInGrams,
        totalProteinsInGrams: input.totalProteinsInGrams,
        totalFatsInGrams: input.totalFatsInGrams,
        foods: {
          createMany: {
            data: input.foods.map((mealFood) => ({
              foodId: mealFood.foodId,
              amount: mealFood.amount,
              unit: mealFood.unit,
              caloriesInKcal: mealFood.caloriesInKcal,
              carbsInGrams: mealFood.carbsInGrams,
              fatsInGrams: mealFood.fatsInGrams,
              proteinsInGrams: mealFood.proteinsInGrams,
            })),
          },
        },
      },
    })
  }
}
