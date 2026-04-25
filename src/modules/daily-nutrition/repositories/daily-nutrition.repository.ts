import { Injectable } from '@nestjs/common'
import { DailyNutrition } from 'generated/prisma/client'
import { GetTodayNutritionInput } from '../types/get-today-nutrition.type'
import { UpsertTodayNutritionInput } from '../types/upsert-today-nutrition.type'

@Injectable()
export abstract class DailyNutritionRepository {
  abstract get(input: GetTodayNutritionInput): Promise<DailyNutrition | null>
  abstract upsert(input: UpsertTodayNutritionInput): Promise<DailyNutrition>
}
