import { Injectable } from '@nestjs/common'
import { GetWorkoutConfigInput, GetWorkoutConfigOutput } from '../types/get-workout-config.type'
import {
  RegisterWorkoutConfigInput,
  RegisterWorkoutConfigOutput,
} from '../types/register-workout-config.type'

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract registerWorkoutConfig(
    input: RegisterWorkoutConfigInput,
  ): Promise<RegisterWorkoutConfigOutput>
  abstract getWorkoutConfig(input: GetWorkoutConfigInput): Promise<GetWorkoutConfigOutput | null>
}
