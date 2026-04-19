import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersModule } from '../users/users.module'
import { FoodsController } from './controller/foods.controller'
import { FoodsRepository } from './repositories/foods.repository'
import { PrismaFoodsRepository } from './repositories/prisma-foods.repository'
import { SaveFoodUseCase } from './use-cases/save-food.use-case'
import { SearchFoodsUseCase } from './use-cases/search-foods.use-case'

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
