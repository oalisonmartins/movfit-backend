import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigRepository } from 'src/modules/workout-config/repositories/workout-config.repository'
import { GetMeResponse } from '../types/get-me.type'

@Injectable()
export class GetMeUseCase {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly workoutConfigRepo: WorkoutConfigRepository,
  ) {}

  async execute(): Promise<GetMeResponse> {
    const user = this.requestContext.getUser
    const profile = this.requestContext.getProfile
    const workoutConfig = await this.workoutConfigRepo.getWorkoutConfig(user.id)
    return {
      email: user.email,
      name: user.name,
      profile: {
        biologicalSex: profile.biologicalSex,
        birthDate: profile.birthDate,
        goal: profile.goal,
        heightInCentimeters: profile.heightInCentimeters,
        targetWeightInGrams: profile.targetWeightInGrams,
        weightInGrams: profile.weightInGrams,
      },
      workoutConfig: {
        id: workoutConfig?.id,
        focusMuscles: workoutConfig?.focusMuscles,
        freeDaysPerWeek: workoutConfig?.freeDaysPerWeek,
        freeTimeByDayInSeconds: workoutConfig?.freeTimeByDayInSeconds,
      },
    }
  }
}
