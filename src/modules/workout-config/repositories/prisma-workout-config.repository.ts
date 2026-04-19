import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { BaseRepository } from 'src/common/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { RegisterWorkoutConfigInput } from '../types/register-workout-config.type'
import { WorkoutConfigRepository } from './workout-config.repository'

@Injectable()
export class PrismaWorkoutConfigRepository extends BaseRepository implements WorkoutConfigRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async getWorkoutConfig(userId: string): Promise<WorkoutConfig | null> {
    return await this.db.workoutConfig.findFirst({
      where: { userId },
    })
  }

  async registerWorkoutConfig(userId: string, input: RegisterWorkoutConfigInput): Promise<WorkoutConfig> {
    return await this.db.workoutConfig.create({
      data: {
        userId,
        freeDaysPerWeek: input.freeDaysPerWeek,
        freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
        focusMuscles: input.focusMuscles,
      },
    })
  }
}
