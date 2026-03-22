import { Injectable } from '@nestjs/common';
import { DailyNutrition } from '../entities/daily-nutrition.entity';

export type UpsertDailyNutritionData = {
  userId: string;
  carbsInGrams?: number;
  proteinsInGrams?: number;
  fatsInGrams?: number;
};

@Injectable()
export abstract class DailyNutritionRepository {
  abstract getTotalMacros(userId: string): Promise<DailyNutrition | null>;

  abstract upsertDailyNutrition({
    userId,
    carbsInGrams,
    fatsInGrams,
    proteinsInGrams,
  }: UpsertDailyNutritionData): Promise<DailyNutrition>;
}
