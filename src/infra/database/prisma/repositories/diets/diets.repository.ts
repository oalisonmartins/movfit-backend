import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { CreateDietsRepositoryInput } from 'src/modules/diets/types/create-diet.types'

@Injectable()
export class PrismaDietsRepository extends BaseRepository implements DietsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(input: CreateDietsRepositoryInput): Promise<Diet> {
    return await this.db.diet.create({
      data: {
        userId: input.userId,
        totalCalorieInKcal: input.totalCalorieInKcal,
        totalProteinInGrams: input.totalProteinInGrams,
        totalCarbInGrams: input.totalCarbInGrams,
        totalFatInGrams: input.totalFatInGrams,
        goal: input.goal,
        isActive: true,
      },
    })
  }

  async findOne(dietId: string, userId: string): Promise<Diet | null> {
    return await this.db.diet.findUnique({
      where: { id: dietId, userId },
    })
  }

  async findOneByMealAndUserId(mealId: string, userId: string): Promise<Diet | null> {
    return await this.db.diet.findFirst({
      where: {
        userId,
        meals: {
          some: {
            id: mealId,
          },
        },
      },
    })
  }

  async findMany(userId: string, isActive?: boolean): Promise<Diet[]> {
    return await this.db.diet.findMany({
      where: {
        userId,
        ...(isActive !== undefined && { isActive }),
      },
      orderBy: [{ createdAt: 'desc' }],
    })
  }

  async deactivate(dietId: string, userId: string): Promise<Diet> {
    return await this.db.diet.update({
      where: { id: dietId, userId, isActive: { equals: true } },
      data: { isActive: false },
    })
  }

  async delete(dietId: string, userId: string): Promise<Diet> {
    return await this.db.diet.delete({
      where: { id: dietId, userId },
    })
  }
}
