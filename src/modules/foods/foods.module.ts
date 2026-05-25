import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaFoodsRepository } from 'src/infra/database/repositories/foods/foods.repository'
import { FoodsController } from 'src/modules/foods/controllers/foods.controller'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { SaveFoodUseCase } from 'src/modules/foods/use-cases/save-food.use-case'
import { SearchFoodsUseCase } from 'src/modules/foods/use-cases/search-foods.use-case'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [FoodsController],
  exports: [FoodsRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    SearchFoodsUseCase,
    SaveFoodUseCase,
    {
      provide: FoodsRepository,
      useClass: PrismaFoodsRepository,
    },
  ],
})
export class FoodsModule {}
