import { Injectable } from '@nestjs/common'
import { WorkoutPlan } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { WorkoutPlanRepository } from 'src/modules/workout/plan/repositories/plan.repository'
import { CreateWorkoutPlanInput } from 'src/modules/workout/plan/types/create-plan.types'

@Injectable()
export class PrismaWorkoutPlanRepository extends BaseRepository implements WorkoutPlanRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(userId: string, input: CreateWorkoutPlanInput): Promise<WorkoutPlan> {
    return await this.db.workoutPlan.create({
      data: {
        userId,
        name: input.name,
        goal: input.goal,
        workoutDays: {
          createMany: {
            data: input.workoutDays,
          },
        },
      },
    })
  }

  async findOne(userId: string, isActive?: boolean): Promise<WorkoutPlan | null> {
    return await this.db.workoutPlan.findFirst({
      where: {
        userId,
        ...(isActive !== undefined && { isActive }),
      },
    })
  }
}
