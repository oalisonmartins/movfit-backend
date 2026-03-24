import { Injectable, NotFoundException } from '@nestjs/common'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'

@Injectable()
export class GetWorkoutConfigUseCase {
  constructor(private readonly workoutConfigRepository: WorkoutConfigRepository) {}

  async execute(userId: string) {
    const userWorkoutConfig = await this.workoutConfigRepository.getWorkoutConfig(userId)

    if (!userWorkoutConfig) {
      throw new NotFoundException('User workout config not found.')
    }

    return userWorkoutConfig
  }
}
