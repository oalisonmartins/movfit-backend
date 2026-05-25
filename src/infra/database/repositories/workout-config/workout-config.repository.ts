import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { WorkoutConfigRepository } from 'src/modules/workout-config/repositories/workout-config.repository'
import { RegisterWorkoutConfigRepositoryInput } from 'src/modules/workout-config/types'

@Injectable()
export class PrismaWorkoutConfigRepository extends BaseRepository implements WorkoutConfigRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(userId: string): Promise<WorkoutConfig | null> {
    return await this.db.workoutConfig.findFirst({
      where: { userId },
    })
  }

  async create(input: RegisterWorkoutConfigRepositoryInput): Promise<WorkoutConfig> {
    return await this.db.workoutConfig.create({
      data: {
        userId: input.userId,
        freeDaysPerWeek: input.freeDaysPerWeek,
        freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
        focusMuscles: input.focusMuscles,
      },
    })
  }
}
