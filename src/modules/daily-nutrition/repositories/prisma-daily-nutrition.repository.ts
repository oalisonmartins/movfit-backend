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

  private get getTodayUTC() {
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

  async upsert(data: UpsertDailyNutritionData): Promise<DailyNutrition> {
    return await this.prisma.dailyNutrition.upsert({
      where: {
        day: this.getTodayUTC,
        userId_day: {
          userId: data.userId,
          day: this.getTodayUTC,
        },
      },
      create: {
        day: this.getTodayUTC,
        userId: data.userId,
        carbsInGrams: data.carbsInGrams ?? 0,
        fatsInGrams: data.fatsInGrams ?? 0,
        proteinsInGrams: data.proteinsInGrams ?? 0,
      },
      update: {
        carbsInGrams: this.incrementIfDefined(data.carbsInGrams),
        fatsInGrams: this.incrementIfDefined(data.fatsInGrams),
        proteinsInGrams: this.incrementIfDefined(data.proteinsInGrams),
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
      where: {
        userId,
        day: this.getTodayUTC,
      },
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
