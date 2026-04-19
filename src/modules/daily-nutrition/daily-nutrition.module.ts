import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DailyWaterConsumptionModule } from '../daily-water-consumption/daily-water-consumption.module'
import { UsersModule } from '../users/users.module'
import { DailyNutritionController } from './controller/daily-nutrition.controller'
import { DailyNutritionRepository } from './repositories/daily-nutrition.repository'
import { PrismaDailyNutritionRepository } from './repositories/prisma-daily-nutrition.repository'
import { GetTodayNutritionProgressUseCase } from './use-cases/get-today-nutrition-progress.use-case'
import { UpdateTodayNutritionProgressUseCase } from './use-cases/update-today-nutrition-progress.use-case'

@Module({
  imports: [DailyWaterConsumptionModule, UsersModule],
  controllers: [DailyNutritionController],
  exports: [DailyNutritionRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
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
