import { Injectable } from '@nestjs/common'
import { HydrationLog } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'
import { HydrationLogWithEntries } from 'src/modules/hydration/log/types/log-with-entries.types'

@Injectable()
export class PrismaHydrationLogRepository extends BaseRepository implements HydrationLogRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionService: TransactionContextService,
  ) {
    super(prisma, transactionService)
  }

  async create(
    userId: string,
    input: { dailyGoalInMl: number; date: Date },
  ): Promise<HydrationLog> {
    return await this.db.hydrationLog.create({
      data: {
        userId,
        dailyGoalInMl: input.dailyGoalInMl,
        date: input.date,
      },
    })
  }

  async findOne(userId: string, date?: Date): Promise<HydrationLogWithEntries | null> {
    return await this.db.hydrationLog.findFirst({
      where: {
        userId,
        ...(date !== undefined && { date }),
      },
      include: {
        hydrationEntries: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
  }

  async findMany(userId: string, from: Date, to: Date): Promise<HydrationLogWithEntries[] | null> {
    return await this.db.hydrationLog.findMany({
      where: {
        userId,
        date: {
          gte: from,
          lte: to,
        },
      },
      include: {
        hydrationEntries: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
  }
}
