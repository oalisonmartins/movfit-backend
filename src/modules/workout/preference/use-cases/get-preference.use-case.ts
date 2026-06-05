import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutPreference } from 'src/modules/workout/preference/types/preference.types'
import { WorkoutPreferenceRepository } from '../repositories/preference.repository'

@Injectable()
export class GetWorkoutPreferenceUseCase {
  constructor(
    private readonly workoutPreferenceRepository: WorkoutPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<WorkoutPreference | null> {
    const userId = this.requestContext.getUserId
    const workoutPreference = await this.workoutPreferenceRepository.findOne(userId)

    if (!workoutPreference) return null

    return {
      id: workoutPreference.id,
      emphasizedMuscles: workoutPreference.emphasizedMuscles,
      availableDaysPerWeek: workoutPreference.availableDaysPerWeek,
      availableTimePerDayInSeconds: workoutPreference.availableTimePerDayInSeconds,
      createdAt: workoutPreference.createdAt,
    }
  }
}
