import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CreateDietRepositoryInput } from '../types/create-diet.types'
import { DietsRepository } from './diets.repository'

@Injectable()
export class PrismaDietsRepository extends BaseRepository implements DietsRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(userId: string, input: CreateDietRepositoryInput): Promise<Diet> {
    return await this.db.diet.create({
      data: {
        userId,
        totalCaloriesInKcal: input.totalCaloriesInKcal,
        totalProteinsInGrams: input.totalProteinsInGrams,
        totalCarbsInGrams: input.totalCarbsInGrams,
        totalFatsInGrams: input.totalFatsInGrams,
        goal: input.goal,
        isActive: true,
      },
    })
  }

  async getOne(dietId: string, userId: string): Promise<Diet | null> {
    return await this.db.diet.findFirst({
      where: { id: dietId, userId },
    })
  }

  async getAll(userId: string): Promise<Diet[]> {
    return await this.db.diet.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'desc' }],
    })
  }

  async getActive(userId: string): Promise<Diet | null> {
    return await this.db.diet.findFirst({
      where: { userId, isActive: { equals: true } },
    })
  }

  async deactive(dietId: string, userId: string): Promise<void> {
    await this.db.diet.update({
      where: { id: dietId, userId, isActive: { equals: true } },
      data: { isActive: false },
    })
  }

  async delete(dietId: string, userId: string): Promise<void> {
    await this.db.diet.delete({
      where: { id: dietId, userId },
    })
  }
}
