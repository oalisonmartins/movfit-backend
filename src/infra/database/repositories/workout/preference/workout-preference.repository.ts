import { Injectable } from '@nestjs/common'
import { WorkoutPreference } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/preference.repository'
import { CreateWorkoutPreferenceInput } from 'src/modules/workout/preference/types/create-preference.types'

@Injectable()
export class PrismaWorkoutPreferenceRepository
  extends BaseRepository
  implements WorkoutPreferenceRepository
{
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async findOne(userId: string): Promise<WorkoutPreference | null> {
    return await this.db.workoutPreference.findFirst({
      where: { userId },
    })
  }

  async create(userId: string, input: CreateWorkoutPreferenceInput): Promise<WorkoutPreference> {
    return await this.db.workoutPreference.create({
      data: {
        userId,
        goal: input.goal,
        availableDaysPerWeek: input.availableDaysPerWeek,
        availableTimePerDayInSeconds: input.availableTimePerDayInSeconds,
        emphasizedMuscles: input.emphasizedMuscles,
      },
    })
  }
}
