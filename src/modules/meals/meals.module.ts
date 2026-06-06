import { Module } from '@nestjs/common'
import { PrismaMealsRepository } from 'src//infra/database/prisma/repositories/meals/meals.repository'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { MealsRepository } from 'src/modules/meals/repositories/meals.repository'

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
