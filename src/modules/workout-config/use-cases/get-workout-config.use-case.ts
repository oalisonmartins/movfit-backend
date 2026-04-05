import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'
import { GetWorkoutConfigInput, GetWorkoutConfigResponse } from '../types/get-workout-config.type'

@Injectable()
export class GetWorkoutConfigUseCase {
  constructor(
    private readonly workoutConfigRepo: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: GetWorkoutConfigInput): Promise<GetWorkoutConfigResponse | null> {
    const workoutConfig = await this.workoutConfigRepo.getWorkoutConfig(input.userId)

    if (!workoutConfig) {
      return null
    }

    const profile = this.requestContext.getProfile

    return {
      id: workoutConfig.id,
      focusMuscles: workoutConfig.focusMuscles,
      freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
      user: {
        id: workoutConfig.userId,
        profile: {
          id: profile.id,
          goal: profile.goal,
          biologicalSex: profile.biologicalSex,
          birthDate: profile.birthDate,
          heightInCentimeters: profile.heightInCentimeters,
          targetWeightInGrams: profile.targetWeightInGrams,
          timezone: profile.timezone,
          weightInGrams: profile.weightInGrams,
        },
      },
    }
  }
}
