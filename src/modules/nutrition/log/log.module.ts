import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaNutritionLogRepository } from 'src/infra/database/prisma/repositories/nutrition/prisma-nutrition-log.repository'
import { DietsModule } from 'src/modules/diets/diets.module'
import { NutritionLogController } from 'src/modules/nutrition/log/controllers/nutrition-log.controller'
import { NutritionLogRepository } from 'src/modules/nutrition/log/repositories/log.repository'
import { GetNutritionProgressUseCase } from 'src/modules/nutrition/log/use-cases/get-progress.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'

@Module({
  imports: [DietsModule, ProfilesModule],
  controllers: [NutritionLogController],
  exports: [NutritionLogRepository],
  providers: [
    GetNutritionProgressUseCase,
    PrismaService,
    TransactionContextService,
    TransactionService,
    RequestContextService,
    {
      provide: NutritionLogRepository,
      useClass: PrismaNutritionLogRepository,
    },
  ],
})
export class NutritionLogModule {}
