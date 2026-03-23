import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { WaterConsumptionController } from './controllers/water-consumption.controller'
import { PrismaWaterConsumptionRepository } from './repositories/prisma-water-consumption.repository'
import { PrismaWaterConsumptionHistoryRepository } from './repositories/prisma-water-consumption-history.repository'
import { WaterConsumptionRepository } from './repositories/water-consumption.repository'
import { WaterConsumptionHistoryRepository } from './repositories/water-consumption-history.repository'
import { GetWaterConsumptionProgressUseCase } from './use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from './use-cases/register-water-consumption.use-case'

@Module({
  imports: [UsersModule],
  controllers: [WaterConsumptionController],
  exports: [WaterConsumptionRepository],
  providers: [
    PrismaService,
    RequestContextService,
    GetWaterConsumptionProgressUseCase,
    RegisterWaterConsumptionUseCase,
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
