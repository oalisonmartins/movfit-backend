import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../auth/jwt-auth.module';
import { DailyNutritionController } from './controllers/daily-nutrition.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { DailyNutritionRepository } from './repositories/daily-nutrition.repository';
import { PrismaDailyNutritionRepository } from './repositories/prisma-daily-nutrition.repository';
import { GetDailyNutritionUseCase } from './use-cases/get-daily-nutrition.use-case';
import { WaterIngestionModule } from '../water-ingestion/water-ingestion.module';
import { UpdateDailyNutritionUseCase } from './use-cases/update-daily-nutrition.use-case';

@Module({
  imports: [JwtAuthModule, WaterIngestionModule],
  controllers: [DailyNutritionController],
  exports: [DailyNutritionRepository],
  providers: [
    PrismaService,
    GetDailyNutritionUseCase,
    UpdateDailyNutritionUseCase,
    {
      provide: DailyNutritionRepository,
      useClass: PrismaDailyNutritionRepository,
    },
  ],
})
export class DailyNutritionModule {}
