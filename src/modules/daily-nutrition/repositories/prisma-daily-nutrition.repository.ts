import { Injectable } from '@nestjs/common';
import {
  DailyNutritionRepository,
  UpsertDailyNutritionData,
} from './daily-nutrition.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { DailyNutrition } from '../entities/daily-nutrition.entity';

@Injectable()
export class PrismaDailyNutritionRepository implements DailyNutritionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getTodayUTC() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today;
  }

  private incrementIfDefined(value?: number) {
    if (value !== undefined) {
      return { increment: value };
    }
    return undefined;
  }

  async upsertDailyNutrition({
    userId,
    carbsInGrams,
    fatsInGrams,
    proteinsInGrams,
  }: UpsertDailyNutritionData): Promise<DailyNutrition> {
    const todayUTC = this.getTodayUTC();

    return await this.prisma.dailyNutrition.upsert({
      where: {
        userId_day: {
          userId,
          day: todayUTC,
        },
      },
      create: {
        userId,
        day: todayUTC,
        carbsInGrams: carbsInGrams ?? 0,
        fatsInGrams: fatsInGrams ?? 0,
        proteinsInGrams: proteinsInGrams ?? 0,
      },
      update: {
        carbsInGrams: this.incrementIfDefined(carbsInGrams),
        fatsInGrams: this.incrementIfDefined(fatsInGrams),
        proteinsInGrams: this.incrementIfDefined(proteinsInGrams),
      },
      select: {
        day: true,
        fatsInGrams: true,
        carbsInGrams: true,
        proteinsInGrams: true,
        user: {
          select: {
            goal: true,
            birthDate: true,
            biologicalSex: true,
            weightInGrams: true,
            activeDiet: {
              select: {
                carbsInGrams: true,
                fatsInGrams: true,
                proteinsInGrams: true,
              },
            },
          },
        },
      },
    });
  }

  async getTotalMacros(userId: string): Promise<DailyNutrition | null> {
    return await this.prisma.dailyNutrition.findFirst({
      where: { userId },
      select: {
        day: true,
        proteinsInGrams: true,
        fatsInGrams: true,
        carbsInGrams: true,
        user: {
          select: {
            biologicalSex: true,
            birthDate: true,
            weightInGrams: true,
            goal: true,
            activeDiet: {
              select: {
                carbsInGrams: true,
                fatsInGrams: true,
                proteinsInGrams: true,
              },
            },
          },
        },
      },
    });
  }
}
