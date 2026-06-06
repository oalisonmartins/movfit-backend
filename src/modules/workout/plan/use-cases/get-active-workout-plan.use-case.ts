import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutPlanRepository } from 'src/modules/workout/plan/repositories/workout-plan.repository'
import { ActiveWorkoutPlan } from 'src/modules/workout/plan/types/workout-plan.types'

@Injectable()
export class GetActiveWorkoutPlanUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<ActiveWorkoutPlan | null> {
    const userId = this.requestContext.getUserId

    const activeWorkoutPlan = await this.workoutPlanRepository.findOne(userId, true)

    if (!activeWorkoutPlan) return null

    return {
      id: activeWorkoutPlan.id,
      name: activeWorkoutPlan.name,
      goal: activeWorkoutPlan.goal,
      createdAt: activeWorkoutPlan.createdAt,
      updatedAt: activeWorkoutPlan.updatedAt,
    }
  }
}
