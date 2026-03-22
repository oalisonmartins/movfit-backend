import { Injectable } from '@nestjs/common';
import { WaterIngestion } from '../entities/water-ingestion.entity';

@Injectable()
export abstract class WaterIngestionRepository {
  abstract getWaterIngestion(userId: string): Promise<WaterIngestion | null>;

  abstract upsertWaterIngestion(
    userId: string,
    dailyIngestionInMl: number,
  ): Promise<WaterIngestion>;
}
