import { Injectable } from '@nestjs/common'
import { WorkoutPlan } from 'generated/prisma/client'
import { CreateWorkoutPlanInput } from 'src/modules/workout/plan/types/create-workout-plan.types'

@Injectable()
export abstract class WorkoutPlanRepository {
  abstract create(userId: string, input: CreateWorkoutPlanInput): Promise<WorkoutPlan>
  abstract findOne(userId: string, isActive?: boolean): Promise<WorkoutPlan | null>
}
