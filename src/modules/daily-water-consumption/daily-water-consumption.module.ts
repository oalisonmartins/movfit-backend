import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DailyWaterConsumptionController } from 'src/modules/daily-water-consumption/controllers/daily-water-consumption.controller'
import { DailyWaterConsumptionRepository } from 'src/modules/daily-water-consumption/repositories/daily-water-consumption.repository'
import { PrismaDailyWaterConsumptionRepository } from 'src/modules/daily-water-consumption/repositories/prisma-daily-water-consumption.repository'
import { GetDailyWaterConsumptionUseCase } from 'src/modules/daily-water-consumption/use-cases/get-daily-water-consumption.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { UsersModule } from 'src/modules/users/users.module'
import { WorkoutConfigModule } from 'src/modules/workout-config/workout-config.module'

@Module({
  imports: [UsersModule, ProfilesModule, WorkoutConfigModule],
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
