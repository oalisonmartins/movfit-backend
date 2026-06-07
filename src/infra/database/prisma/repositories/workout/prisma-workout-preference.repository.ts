import { Injectable } from '@nestjs/common'
import { WorkoutPreference } from 'generated/prisma/client'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { SetWorkoutPreferenceInput } from 'src/modules/onboarding/types/set-workout-preference.types'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/workout-preference.repository'

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

  async create(userId: string, input: SetWorkoutPreferenceInput): Promise<WorkoutPreference> {
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
