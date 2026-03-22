import { Injectable } from '@nestjs/common';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository';

@Injectable()
export class UpdateDailyNutritionUseCase {
  constructor(private readonly repository: DailyNutritionRepository) {}

  async execute(
    userId: string,
    { carbsInGrams, fatsInGrams, proteinsInGrams }: UpdateDailyNutritionDto,
  ) {
    await this.repository.upsertDailyNutrition({
      userId,
      carbsInGrams,
      fatsInGrams,
      proteinsInGrams,
    });
  }
}
