import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'
import { GetWorkoutConfigInput, GetWorkoutConfigResponse } from '../types/get-workout-config.type'

@Injectable()
export class GetWorkoutConfigUseCase {
  constructor(private readonly workoutConfigRepository: WorkoutConfigRepository) {}

  async execute(input: GetWorkoutConfigInput): Promise<GetWorkoutConfigResponse> {
    const workoutConfig = await this.workoutConfigRepository.getWorkoutConfig({
      userId: input.userId,
    })

    if (!workoutConfig) {
      throw new NotFoundException('User workout config not found.')
    }

    if (!workoutConfig.user.profile) {
      throw new UnauthorizedException('Complete onboarding and try again.')
    }

    return {
      id: workoutConfig.id,
      focusMuscles: workoutConfig.focusMuscles,
      freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
      user: {
        id: workoutConfig.userId,
        profile: {
          id: workoutConfig.user.profile.id,
          goal: workoutConfig.user.profile.goal,
          biologicalSex: workoutConfig.user.profile.biologicalSex,
          birthDate: workoutConfig.user.profile.birthDate,
          heightInCentimeters: workoutConfig.user.profile.heightInCentimeters,
          targetWeightInGrams: workoutConfig.user.profile.targetWeightInGrams,
          timezone: workoutConfig.user.profile.timezone,
          weightInGrams: workoutConfig.user.profile.weightInGrams,
        },
      },
    }
  }
}
