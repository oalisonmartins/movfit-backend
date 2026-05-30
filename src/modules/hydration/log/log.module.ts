import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaHydrationLogRepository } from 'src/infra/database/repositories/hydration/log/hydration-log.repository'
import { HydrationLogController } from 'src/modules/hydration/log/controllers/log.controller'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'
import { CreateHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/create-log.use-case'
import { GetHydrationHistoryUseCase } from 'src/modules/hydration/log/use-cases/get-history.use-case'
import { GetHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/get-log.use-case'
import { GetHydrationProgressUseCase } from 'src/modules/hydration/log/use-cases/get-progress.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { WorkoutConfigModule } from 'src/modules/workout/config/config.module'

@Module({
  imports: [ProfilesModule, WorkoutConfigModule],
  controllers: [HydrationLogController],
  exports: [HydrationLogRepository],
  providers: [
    CreateHydrationLogUseCase,
    GetHydrationLogUseCase,
    GetHydrationProgressUseCase,
    GetHydrationHistoryUseCase,
    RequestContextService,
    TransactionContextService,
    TransactionService,
    PrismaService,
    {
      provide: HydrationLogRepository,
      useClass: PrismaHydrationLogRepository,
    },
  ],
})
export class HydrationLogModule {}
