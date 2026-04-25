import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { MeOutput } from '../types/me.type'

@Injectable()
export class MeUseCase {
  constructor(private readonly requestContext: RequestContextService) {}

  async execute(): Promise<MeOutput> {
    const user = this.requestContext.getUser
    const profile = this.requestContext.getProfile
    const workoutConfig = this.requestContext.getWorkoutConfig

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile: {
        id: profile.id,
        timezone: profile.timezone,
        biologicalSex: profile.biologicalSex,
        birthDate: profile.birthDate,
        goal: profile.goal,
        heightInCentimeters: profile.heightInCentimeters,
        targetWeightInGrams: profile.targetWeightInGrams,
        weightInGrams: profile.weightInGrams,
      },
      workoutConfig: {
        id: workoutConfig.id,
        focusMuscles: workoutConfig.focusMuscles,
        freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
        freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
      },
    }
  }
}
