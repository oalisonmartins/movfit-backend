import { Injectable } from '@nestjs/common'
import { NutritionLog } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { NutritionLogRepository } from 'src/modules/nutrition/log/repositories/log.repository'
import { NutritionMacros } from 'src/modules/nutrition/types/nutrition-macros.types'

@Injectable()
export class PrismaNutritionLogRepository extends BaseRepository implements NutritionLogRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(userId: string, date: Date, macros?: NutritionMacros): Promise<NutritionLog> {
    return await this.prisma.nutritionLog.upsert({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      create: {
        userId,
        date,
        ...macros,
      },
      update: { ...macros },
    })
  }

  async findOne(userId: string, date: Date): Promise<NutritionLog | null> {
    return await this.prisma.nutritionLog.findFirst({
      where: {
        userId,
        date,
      },
    })
  }
}
