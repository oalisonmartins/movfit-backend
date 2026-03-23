import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DailyNutritionRepository } from '../repositories/daily-nutrition.repository';
import { toPercentage } from 'src/common/helpers/to-percentage.helper';
import { RequestContextService } from 'src/common/services/request-context.service';

@Injectable()
export class GetDailyNutritionUseCase {
  constructor(
    private readonly repository: DailyNutritionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(userId: string) {
    let consumedMacros = await this.repository.getTotalMacros(userId);

    if (consumedMacros === null) {
      consumedMacros = await this.repository.upsert({ userId });
    }

    if (consumedMacros.user === undefined) {
      throw new UnauthorizedException('Unauthorized.');
    }

    if (consumedMacros.user?.activeDiet === null) {
      throw new NotFoundException('Unauthorized.');
    }

    const dailyNutrition = {
      carbohydrates: {
        goal: consumedMacros.user.activeDiet.carbsInGrams,
        consumed: consumedMacros.carbsInGrams,
        percentage: toPercentage({
          goal: consumedMacros.user.activeDiet.carbsInGrams,
          current: consumedMacros.carbsInGrams,
        }),
      },
      proteins: {
        goal: consumedMacros.user.activeDiet.proteinsInGrams,
        consumed: consumedMacros.proteinsInGrams,
        percentage: toPercentage({
          goal: consumedMacros.user.activeDiet.proteinsInGrams,
          current: consumedMacros.proteinsInGrams,
        }),
      },
      fats: {
        goal: consumedMacros.user.activeDiet.fatsInGrams,
        consumed: consumedMacros.fatsInGrams,
        percentage: toPercentage({
          goal: consumedMacros.user.activeDiet.fatsInGrams,
          current: consumedMacros.fatsInGrams,
        }),
      },
    };

    return dailyNutrition;
  }
}
