import { Injectable } from '@nestjs/common'
import { GetTodayNutritionInput, GetTodayNutritionOutput } from '../types/get-today-nutrition.type'
import {
  UpsertTodayNutritionInput,
  UpsertTodayNutritionOutput,
} from '../types/upsert-today-nutrition.type'

@Injectable()
export abstract class DailyNutritionRepository {
  abstract getTodayNutrition(input: GetTodayNutritionInput): Promise<GetTodayNutritionOutput | null>
  abstract upsertTodayNutrition(
    input: UpsertTodayNutritionInput,
  ): Promise<UpsertTodayNutritionOutput>
}
