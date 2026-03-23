import { Injectable } from '@nestjs/common';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository';
import { RequestContextService } from 'src/common/services/request-context.service';

@Injectable()
export class UpdateDailyNutritionUseCase {
  constructor(
    private readonly repository: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(data: UpdateDailyNutritionDto) {
    const userId = this.requestContext.getUserId;
    return await this.repository.upsert({ userId, ...data });
  }
}
