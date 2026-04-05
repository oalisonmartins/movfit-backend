import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { RegisterWorkoutConfigInput } from '../types/register-workout-config.type'

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract getWorkoutConfig(userId: string): Promise<WorkoutConfig | null>

  abstract registerWorkoutConfig(
    userId: string,
    input: RegisterWorkoutConfigInput,
  ): Promise<WorkoutConfig>
}
