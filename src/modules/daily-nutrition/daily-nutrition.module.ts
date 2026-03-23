import { Module } from '@nestjs/common';
import { DailyNutritionController } from './controllers/daily-nutrition.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { DailyNutritionRepository } from './repositories/daily-nutrition.repository';
import { PrismaDailyNutritionRepository } from './repositories/prisma-daily-nutrition.repository';
import { GetDailyNutritionUseCase } from './use-cases/get-daily-nutrition.use-case';
import { WaterIngestionModule } from '../water-ingestion/water-ingestion.module';
import { UpdateDailyNutritionUseCase } from './use-cases/update-daily-nutrition.use-case';
import { RequestContextService } from 'src/common/services/request-context.service';

@Module({
  imports: [WaterIngestionModule],
  controllers: [DailyNutritionController],
  exports: [DailyNutritionRepository],
  providers: [
    PrismaService,
    RequestContextService,
    GetDailyNutritionUseCase,
    UpdateDailyNutritionUseCase,
    {
      provide: DailyNutritionRepository,
      useClass: PrismaDailyNutritionRepository,
    },
  ],
})
export class DailyNutritionModule {}
