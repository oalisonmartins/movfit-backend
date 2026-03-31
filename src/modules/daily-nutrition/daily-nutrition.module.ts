import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { WaterConsumptionModule } from '../water-consumption/water-consumption.module'
import { DailyNutritionController } from './controllers/daily-nutrition.controller'
import { DailyNutritionRepository } from './repositories/daily-nutrition.repository'
import { PrismaDailyNutritionRepository } from './repositories/prisma-daily-nutrition.repository'
import { GetTodayNutritionProgressUseCase } from './use-cases/get-today-nutrition-progress.use-case'
import { UpdateTodayNutritionProgressUseCase } from './use-cases/update-today-nutrition-progress.use-case'

@Module({
  imports: [WaterConsumptionModule, UsersModule],
  controllers: [DailyNutritionController],
  exports: [DailyNutritionRepository],
  providers: [
    PrismaService,
    RequestContextService,
    GetTodayNutritionProgressUseCase,
    UpdateTodayNutritionProgressUseCase,
    {
      provide: DailyNutritionRepository,
      useClass: PrismaDailyNutritionRepository,
    },
  ],
})
export class DailyNutritionModule {}
