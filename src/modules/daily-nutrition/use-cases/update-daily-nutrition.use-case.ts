import { Injectable } from '@nestjs/common';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository';

@Injectable()
export class UpdateDailyNutritionUseCase {
  constructor(private readonly repository: DailyNutritionRepository) {}

  async execute(userId: string, data: UpdateDailyNutritionDto) {
    return await this.repository.upsertDailyNutrition({
      userId,
      carbsInGrams: data.carbsInGrams,
      fatsInGrams: data.fatsInGrams,
      proteinsInGrams: data.proteinsInGrams,
    });
  }
}
