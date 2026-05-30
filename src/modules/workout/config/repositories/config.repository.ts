import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { CreateWorkoutConfigInput } from 'src/modules/workout/config/types/create-config.types'

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract findOne(userId: string): Promise<WorkoutConfig | null>
  abstract create(userId: string, input: CreateWorkoutConfigInput): Promise<WorkoutConfig>
}
