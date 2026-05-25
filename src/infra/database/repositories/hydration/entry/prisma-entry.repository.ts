import { Injectable } from '@nestjs/common'
import { HydrationEntry } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { HydrationEntryRepository } from 'src/modules/hydration/entry/repositories/entry.repository'

@Injectable()
export class PrismaHydrationEntryRepository extends BaseRepository implements HydrationEntryRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionService: TransactionContextService,
  ) {
    super(prisma, transactionService)
  }

  async create(userId: string, input: { amountInMl: number; hydrationLogId: string }): Promise<HydrationEntry> {
    return await this.db.$transaction(async (tx) => {
      const hydrationEntry = await tx.hydrationEntry.create({
        data: {
          userId,
          amountInMl: input.amountInMl,
          hydrationLogId: input.hydrationLogId,
        },
      })

      await tx.hydrationLog.update({
        where: {
          userId,
          id: input.hydrationLogId,
        },
        data: {
          totalConsumedInMl: {
            increment: hydrationEntry.amountInMl,
          },
        },
      })

      return hydrationEntry
    })
  }

  findMany() {}
}
