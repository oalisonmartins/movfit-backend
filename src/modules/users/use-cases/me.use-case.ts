import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { MeOutput } from '../types/me.type'

@Injectable()
export class MeUseCase {
  constructor(private readonly requestContext: RequestContextService) {}

  async execute(): Promise<MeOutput> {
    const user = this.requestContext.getUser

    const profile = this.requestContext.getProfile
    const workoutPreference = this.requestContext.getWorkoutPreference
    const dietPreference = this.requestContext.getDietPreference

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profile: {
        id: profile.id,
        timezone: profile.timezone,
        biologicalSex: profile.biologicalSex,
        birthDate: profile.birthDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
        heightInCm: profile.heightInCm,
        targetWeightInKg: profile.targetWeightInKg,
        weightInKg: profile.weightInKg,
      },
      workoutPreference: {
        id: workoutPreference.id,
        emphasizedMuscles: workoutPreference.emphasizedMuscles,
        availableDaysPerWeek: workoutPreference.availableDaysPerWeek,
        availableTimePerDayInSeconds: workoutPreference.availableTimePerDayInSeconds,
      },
      dietPreference: {
        id: dietPreference.id,
        goal: dietPreference.goal,
        generationType: dietPreference.generationType,
        updatedAt: dietPreference.updatedAt,
      },
    }
  }
}
