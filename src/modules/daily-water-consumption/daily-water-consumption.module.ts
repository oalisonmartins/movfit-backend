import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileModule } from '../profile/profile.module'
import { UsersModule } from '../users/users.module'
import { WorkoutConfigModule } from '../workout-config/workout-config.module'
import { DailyWaterConsumptionController } from './controller/daily-water-consumption.controller'
import { DailyWaterConsumptionRepository } from './repositories/daily-water-consumption.repository'
import { PrismaDailyWaterConsumptionRepository } from './repositories/prisma-daily-water-consumption.repository'
import { GetDailyWaterConsumptionUseCase } from './use-cases/get-daily-water-consumption.use-case'

@Module({
  imports: [UsersModule, ProfileModule, WorkoutConfigModule],
  controllers: [DailyWaterConsumptionController],
  exports: [DailyWaterConsumptionRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    GetDailyWaterConsumptionUseCase,
    {
      provide: DailyWaterConsumptionRepository,
      useClass: PrismaDailyWaterConsumptionRepository,
    },
  ],
})
export class DailyWaterConsumptionModule {}
