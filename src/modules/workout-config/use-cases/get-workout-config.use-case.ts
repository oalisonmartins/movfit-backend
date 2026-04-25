import { Injectable } from '@nestjs/common'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'
import { GetWorkoutConfigOutput } from '../types/get-workout-config.type'

@Injectable()
export class GetWorkoutConfigUseCase {
  constructor(private readonly workoutConfigRepo: WorkoutConfigRepository) {}

  async execute(userId: string): Promise<GetWorkoutConfigOutput | null> {
    const workoutConfig = await this.workoutConfigRepo.get(userId)
    if (!workoutConfig) return null

    return {
      id: workoutConfig.id,
      focusMuscles: workoutConfig.focusMuscles,
      freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
    }
  }
}
