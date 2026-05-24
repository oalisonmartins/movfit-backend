import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaNutritionEntryRepository } from 'src/infra/database/repositories/nutritions/nutrition-entry.repository'
import { PrismaNutritionLogRepository } from 'src/infra/database/repositories/nutritions/nutrition-log.repository'
import { DietsModule } from 'src/modules/diets/diets.module'
import { NutritionEntryController } from 'src/modules/nutritions/controllers/nutrition-entry.controller'
import { NutritionLogController } from 'src/modules/nutritions/controllers/nutrition-log.controller'
import { NutritionEntryRepository } from 'src/modules/nutritions/repositories/nutrition-entry.repository'
import { NutritionLogRepository } from 'src/modules/nutritions/repositories/nutrition-log.repository'
import { AddNutritionEntryUseCase } from 'src/modules/nutritions/use-cases/add-nutrition-entry.use-case'
import { GetNutritionProgressUseCase } from 'src/modules/nutritions/use-cases/get-nutrition-progress.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'

@Module({
  imports: [ProfilesModule, DietsModule],
  controllers: [NutritionEntryController, NutritionLogController],
  providers: [
    PrismaService,
    RequestContextService,
    TransactionContextService,
    {
      provide: NutritionEntryRepository,
      useClass: PrismaNutritionEntryRepository,
    },
    {
      provide: NutritionLogRepository,
      useClass: PrismaNutritionLogRepository,
    },
    GetNutritionProgressUseCase,
    AddNutritionEntryUseCase,
  ],
})
export class NutritionModule {}
