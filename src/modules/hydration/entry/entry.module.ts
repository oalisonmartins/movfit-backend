import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaHydrationEntryRepository } from 'src/infra/database/repositories/hydration/entry/prisma-entry.repository'
import { HydrationEntryController } from 'src/modules/hydration/entry/controllers/entry.controller'
import { HydrationEntryRepository } from 'src/modules/hydration/entry/repositories/entry.repository'
import { IntakeWaterUseCase } from 'src/modules/hydration/entry/use-cases/intake-water.use-case'
import { HydrationLogModule } from 'src/modules/hydration/log/log.module'

@Module({
  imports: [HydrationLogModule],
  controllers: [HydrationEntryController],
  providers: [
    IntakeWaterUseCase,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    PrismaService,
    {
      provide: HydrationEntryRepository,
      useClass: PrismaHydrationEntryRepository,
    },
  ],
})
export class HydrationEntryModule {}
