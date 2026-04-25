import { Injectable } from '@nestjs/common'
import { DailyNutrition } from 'generated/prisma/client'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetTodayNutritionInput } from '../types/get-today-nutrition.type'
import { UpsertTodayNutritionInput } from '../types/upsert-today-nutrition.type'
import { DailyNutritionRepository } from './daily-nutrition.repository'

@Injectable()
export class PrismaDailyNutritionRepository extends BaseRepository implements DailyNutritionRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  private incrementIfDefined(value?: number) {
    return value !== undefined ? { increment: value } : undefined
  }

  async upsert(input: UpsertTodayNutritionInput): Promise<DailyNutrition> {
    return await this.db.dailyNutrition.upsert({
      where: {
        userId_day: {
          userId: input.userId,
          day: getTodayInTimezone(input.timezone),
        },
      },
      create: {
        userId: input.userId,
        day: getTodayInTimezone(input.timezone),
        carbsInGrams: input.carbsInGrams,
        fatsInGrams: input.fatsInGrams,
        proteinsInGrams: input.proteinsInGrams,
      },
      update: {
        carbsInGrams: this.incrementIfDefined(input.carbsInGrams),
        fatsInGrams: this.incrementIfDefined(input.fatsInGrams),
        proteinsInGrams: this.incrementIfDefined(input.proteinsInGrams),
      },
    })
  }

  async get(input: GetTodayNutritionInput): Promise<DailyNutrition | null> {
    return await this.db.dailyNutrition.findFirst({
      where: {
        userId: input.userId,
        day: getTodayInTimezone(input.timezone),
      },
    })
  }
}
