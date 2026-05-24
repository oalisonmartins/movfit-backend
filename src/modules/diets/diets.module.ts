import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsController } from 'src/modules/diets/controllers/diets.controller'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { PrismaDietsRepository } from 'src/modules/diets/repositories/prisma-diets.repository'
import { CreateDietUseCase } from 'src/modules/diets/use-cases/create-diet.use-case'
import { DeleteDietUseCase } from 'src/modules/diets/use-cases/delete-diet.use-case'
import { GetDietsUseCase } from 'src/modules/diets/use-cases/get-diets.use-case'
import { FoodsModule } from 'src/modules/foods/foods.module'
import { MealsModule } from 'src/modules/meals/meals.module'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'

@Module({
  imports: [MealsModule, FoodsModule, ProfilesModule],
  controllers: [DietsController],
  exports: [DietsRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    GetDietsUseCase,
    CreateDietUseCase,
    DeleteDietUseCase,
    {
      provide: DietsRepository,
      useClass: PrismaDietsRepository,
    },
  ],
})
export class DietsModule {}
