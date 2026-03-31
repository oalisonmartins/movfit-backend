import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { WaterConsumptionController } from './controllers/water-consumption.controller'
import { PrismaWaterConsumptionRepository } from './repositories/prisma-water-consumption.repository'
import { PrismaWaterConsumptionHistoryRepository } from './repositories/prisma-water-consumption-history.repository'
import { WaterConsumptionRepository } from './repositories/water-consumption.repository'
import { WaterConsumptionHistoryRepository } from './repositories/water-consumption-history.repository'
import { GetTodayWaterConsumptionProgressUseCase } from './use-cases/get-today-water-consumption-progress.use-case'
import { GetWaterConsumptionHistoryUseCase } from './use-cases/get-water-consumption-history.use-case'
import { RegisterTodayWaterConsumptionUseCase } from './use-cases/register-today-water-consumption.use-case'

@Module({
  imports: [UsersModule],
  controllers: [WaterConsumptionController],
  exports: [WaterConsumptionRepository],
  providers: [
    PrismaService,
    RequestContextService,
    RegisterTodayWaterConsumptionUseCase,
    GetTodayWaterConsumptionProgressUseCase,
    GetWaterConsumptionHistoryUseCase,
    {
      provide: WaterConsumptionRepository,
      useClass: PrismaWaterConsumptionRepository,
    },
    {
      provide: WaterConsumptionHistoryRepository,
      useClass: PrismaWaterConsumptionHistoryRepository,
    },
  ],
})
export class WaterConsumptionModule {}
