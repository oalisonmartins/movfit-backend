import { Injectable } from '@nestjs/common'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'
import {
  RegisterWorkoutConfigInput,
  RegisterWorkoutConfigOutput,
} from '../types/register-workout-config.type'

@Injectable()
export class RegisterWorkoutConfigUseCase {
  constructor(private readonly workoutConfigRepository: WorkoutConfigRepository) {}

  async execute(input: RegisterWorkoutConfigInput): Promise<RegisterWorkoutConfigOutput> {
    return this.workoutConfigRepository.registerWorkoutConfig({
      userId: input.userId,
      freeDaysPerWeek: input.freeDaysPerWeek,
      freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
      focusMuscles: input.focusMuscles,
    })
  }
}
