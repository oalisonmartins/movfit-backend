import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DailyWaterConsumptionModule } from '../daily-water-consumption/daily-water-consumption.module'
import { ProfileModule } from '../profile/profile.module'
import { WaterConsumptionController } from './controller/water-consumption.controller'
import { PrismaWaterConsumptionRepository } from './repositories/prisma-water-consumption.repository'
import { WaterConsumptionRepository } from './repositories/water-consumption.repository'
import { GetWaterConsumptionHistoryUseCase } from './use-cases/get-water-consumption-history.use-case'
import { GetWaterConsumptionProgressUseCase } from './use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from './use-cases/register-water-consumption.use-case'

@Module({
  imports: [DailyWaterConsumptionModule, ProfileModule],
  controllers: [WaterConsumptionController],
  providers: [
    PrismaService,
    GetWaterConsumptionHistoryUseCase,
    GetWaterConsumptionProgressUseCase,
    RegisterWaterConsumptionUseCase,
    RequestContextService,
    {
      provide: WaterConsumptionRepository,
      useClass: PrismaWaterConsumptionRepository,
    },
  ],
})
export class WaterConsumptionHistoryModule {}
