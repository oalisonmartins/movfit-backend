import { Injectable } from '@nestjs/common'
import { DailyNutrition } from 'generated/prisma/client'
import { getTodayInTimezone } from 'src/common/helpers/get-today-in-timezone.helper'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetTodayNutritionInput } from '../types/get-today-nutrition.type'
import {
  UpsertTodayNutritionInput,
  UpsertTodayNutritionOutput,
} from '../types/upsert-today-nutrition.type'
import { DailyNutritionRepository } from './daily-nutrition.repository'

@Injectable()
export class PrismaDailyNutritionRepository implements DailyNutritionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private incrementIfDefined(value?: number) {
    return value !== undefined ? { increment: value } : undefined
  }

  async upsertTodayNutrition(
    input: UpsertTodayNutritionInput,
  ): Promise<UpsertTodayNutritionOutput> {
    const dailyNutrition = await this.prisma.dailyNutrition.upsert({
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
      select: {
        day: true,
        carbsInGrams: true,
        fatsInGrams: true,
        proteinsInGrams: true,
      },
    })
    return dailyNutrition
  }

  async getTodayNutrition(input: GetTodayNutritionInput): Promise<DailyNutrition | null> {
    const dailyNutrition = await this.prisma.dailyNutrition.findFirst({
      where: {
        userId: input.userId,
        day: getTodayInTimezone(input.timezone),
      },
    })
    return dailyNutrition
  }
}
