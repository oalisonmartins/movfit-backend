import { Injectable } from '@nestjs/common'
import { WorkoutPreference } from 'generated/prisma/client'
import { CreateWorkoutPreferenceInput } from 'src/modules/workout/preference/types/create-preference.types'

@Injectable()
export abstract class WorkoutPreferenceRepository {
  abstract findOne(userId: string): Promise<WorkoutPreference | null>
  abstract create(userId: string, input: CreateWorkoutPreferenceInput): Promise<WorkoutPreference>
}
