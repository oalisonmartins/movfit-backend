import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DailyWaterConsumptionModule } from 'src/modules/daily-water-consumption/daily-water-consumption.module'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { WaterConsumptionController } from 'src/modules/water-consumption/controller/water-consumption.controller'
import { PrismaWaterConsumptionRepository } from 'src/modules/water-consumption/repositories/prisma-water-consumption.repository'
import { WaterConsumptionRepository } from 'src/modules/water-consumption/repositories/water-consumption.repository'
import { GetWaterConsumptionHistoryUseCase } from 'src/modules/water-consumption/use-cases/get-water-consumption-history.use-case'
import { GetWaterConsumptionProgressUseCase } from 'src/modules/water-consumption/use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from 'src/modules/water-consumption/use-cases/register-water-consumption.use-case'

@Module({
  imports: [DailyWaterConsumptionModule, ProfilesModule],
  controllers: [WaterConsumptionController],
  providers: [
    PrismaService,
    RequestContextService,
    TransactionService,
    TransactionContextService,
    GetWaterConsumptionHistoryUseCase,
    GetWaterConsumptionProgressUseCase,
    RegisterWaterConsumptionUseCase,
    {
      provide: WaterConsumptionRepository,
      useClass: PrismaWaterConsumptionRepository,
    },
  ],
})
export class WaterConsumptionHistoryModule {}
