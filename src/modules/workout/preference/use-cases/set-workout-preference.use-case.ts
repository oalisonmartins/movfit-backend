import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { SetWorkoutPreferenceInput } from 'src/modules/workout/preference/types/set-workout-preference.types'
import { WorkoutPreference } from 'src/modules/workout/preference/types/workout-preference.types'
import { WorkoutPreferenceRepository } from '../repositories/workout-preference.repository'

@Injectable()
export class SetWorkoutPreferenceUseCase {
  constructor(
    private readonly workoutPreferenceRepository: WorkoutPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: SetWorkoutPreferenceInput): Promise<WorkoutPreference> {
    const userId = this.requestContext.getUserId

    const workoutPreference = await this.workoutPreferenceRepository.findOne(userId)

    if (workoutPreference) {
      throw new HttpException(
        {
          message: 'Você já tem uma preferência de treino definida',
          code: 'WORKOUT_PREFERENCE_ALREADY_DEFINED',
        },
        HttpStatus.CONFLICT,
      )
    }

    const createdPreference = await this.workoutPreferenceRepository.create(userId, input)

    return {
      id: createdPreference.id,
      emphasizedMuscles: createdPreference.emphasizedMuscles,
      availableDaysPerWeek: createdPreference.availableDaysPerWeek,
      availableTimePerDayInSeconds: createdPreference.availableTimePerDayInSeconds,
      createdAt: createdPreference.createdAt,
    }
  }
}
