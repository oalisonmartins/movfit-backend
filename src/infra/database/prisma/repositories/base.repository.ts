import { Injectable } from '@nestjs/common'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Injectable()
export abstract class BaseRepository {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly transactionContext: TransactionContextService,
  ) {}

  protected get db() {
    return this.transactionContext.get() ?? this.prisma
  }
}
