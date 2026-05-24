import { Injectable } from '@nestjs/common'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { NutritionEntryRepository } from 'src/modules/nutritions/repositories/nutrition-entry.repository'
import { CreateNutritionEntryInput } from 'src/modules/nutritions/types/create-nutrition-entry.types'
import { NutritionEntryWithFood } from 'src/modules/nutritions/types/nutrition-entry-with-food.types'

@Injectable()
export class PrismaNutritionEntryRepository extends BaseRepository implements NutritionEntryRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(userId: string, data: CreateNutritionEntryInput): Promise<NutritionEntryWithFood> {
    return await this.db.$transaction(async (tx) => {
      const newEntry = await tx.nutritionEntry.create({
        data: {
          userId,
          date: data.date,
          amountInGrams: data.amountInGrams,
          dietId: data.dietId,
          foodId: data.foodId,
          mealId: data.mealId,
        },
        include: {
          food: true,
        },
      })

      await tx.nutritionLog.upsert({
        where: {
          userId_date: {
            userId,
            date: data.date,
          },
        },
        create: {
          userId,
          calorieInKcal: (newEntry.food.caloriePer100gInKcal * newEntry.amountInGrams) / 100,
          proteinInGrams: (newEntry.food.proteinPer100gInGrams * newEntry.amountInGrams) / 100,
          carbInGrams: (newEntry.food.carbPer100gInGrams * newEntry.amountInGrams) / 100,
          fatInGrams: (newEntry.food.fatPer100gInGrams * newEntry.amountInGrams) / 100,
          date: data.date,
        },
        update: {
          userId,
          date: newEntry.date,
          calorieInKcal: {
            increment: (newEntry.food.caloriePer100gInKcal * newEntry.amountInGrams) / 100,
          },
          proteinInGrams: {
            increment: (newEntry.food.proteinPer100gInGrams * newEntry.amountInGrams) / 100,
          },
          carbInGrams: {
            increment: (newEntry.food.carbPer100gInGrams * newEntry.amountInGrams) / 100,
          },
          fatInGrams: {
            increment: (newEntry.food.fatPer100gInGrams * newEntry.amountInGrams) / 100,
          },
        },
      })

      return newEntry
    })
  }
}
