import { Module } from '@nestjs/common'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { MealsRepository } from './repositories/meals.repository'
import { PrismaMealsRepository } from './repositories/prisma-diet-meals.repository'

@Module({
  exports: [MealsRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    {
      provide: MealsRepository,
      useClass: PrismaMealsRepository,
    },
  ],
})
export class MealsModule {}
