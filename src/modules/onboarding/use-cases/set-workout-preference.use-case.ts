import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { SetWorkoutPreferenceInput } from 'src/modules/onboarding/types/set-workout-preference.types'
import { WorkoutPreference } from 'src/modules/workout/preference/types/workout-preference.types'
import { WorkoutPreferenceRepository } from '../../workout/preference/repositories/workout-preference.repository'

@Injectable()
export class SetWorkoutPreferenceUseCase {
  constructor(
    private readonly workoutPreferenceRepository: WorkoutPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: SetWorkoutPreferenceInput): Promise<WorkoutPreference> {
    const userId = this.requestContext.getUserId

    const existingWorkoutPreference = await this.workoutPreferenceRepository.findOne(userId)

    if (existingWorkoutPreference) {
      throw new HttpException(
        {
          message: 'Você já preferências de treino definidas',
          code: 'EXISTING_WORKOUT_PREFERENCE',
        },
        HttpStatus.CONFLICT,
      )
    }

    const workoutPreference = await this.workoutPreferenceRepository.create(userId, input)

    return {
      id: workoutPreference.id,
      emphasizedMuscles: workoutPreference.emphasizedMuscles,
      availableDaysPerWeek: workoutPreference.availableDaysPerWeek,
      availableTimePerDayInSeconds: workoutPreference.availableTimePerDayInSeconds,
      createdAt: workoutPreference.createdAt,
    }
  }
}
