import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { WaterConsumptionModule } from '../water-consumption/water-consumption.module'
import { DailyNutritionController } from './controllers/daily-nutrition.controller'
import { DailyNutritionRepository } from './repositories/daily-nutrition.repository'
import { PrismaDailyNutritionRepository } from './repositories/prisma-daily-nutrition.repository'
import { GetDailyNutritionUseCase } from './use-cases/get-daily-nutrition.use-case'
import { UpdateDailyNutritionUseCase } from './use-cases/update-daily-nutrition.use-case'

@Module({
  imports: [WaterConsumptionModule],
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
