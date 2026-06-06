import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaNutritionEntryRepository } from 'src/infra/database/prisma/repositories/nutrition/prisma-nutrition-entry.repository'
import { DietsModule } from 'src/modules/diets/diets.module'
import { MealsModule } from 'src/modules/meals/meals.module'
import { NutritionEntryController } from 'src/modules/nutrition/entry/controllers/entry.controller'
import { NutritionEntryRepository } from 'src/modules/nutrition/entry/repositories/entry.repository'
import { AddNutritionEntryUseCase } from 'src/modules/nutrition/entry/use-cases/add-entry.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'

@Module({
  imports: [ProfilesModule, DietsModule, MealsModule],
  controllers: [NutritionEntryController],
  exports: [NutritionEntryRepository],
  providers: [
    AddNutritionEntryUseCase,
    PrismaService,
    TransactionContextService,
    TransactionService,
    RequestContextService,
    {
      provide: NutritionEntryRepository,
      useClass: PrismaNutritionEntryRepository,
    },
  ],
})
export class NutritionEntryModule {}
