import { Injectable } from '@nestjs/common'
import { WorkoutPreference } from 'generated/prisma/client'
import { SetWorkoutPreferenceInput } from 'src/modules/workout/preference/types/set-workout-preference.types'

@Injectable()
export abstract class WorkoutPreferenceRepository {
  abstract findOne(userId: string): Promise<WorkoutPreference | null>
  abstract create(userId: string, input: SetWorkoutPreferenceInput): Promise<WorkoutPreference>
}
