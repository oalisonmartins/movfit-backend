import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { WaterIngestionRepository } from './water-ingestion.repository';
import { WaterIngestion } from '../entities/water-ingestion.entity';

@Injectable()
export class PrismaWaterIngestionRepository implements WaterIngestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getWaterIngestion(userId: string): Promise<WaterIngestion | null> {
    return this.prisma.waterIngestion.findFirst({
      where: { userId },
      select: {
        goalInMl: true,
        consumedInMl: true,
      },
    });
  }

  async upsertWaterIngestion(
    userId: string,
    dailyIngestionInMl: number,
  ): Promise<WaterIngestion> {
    return this.prisma.waterIngestion.upsert({
      where: { userId },
      create: {
        goalInMl: dailyIngestionInMl,
        userId,
      },
      update: {
        goalInMl: dailyIngestionInMl,
      },
      select: {
        goalInMl: true,
        consumedInMl: true,
      },
    });
  }
}
