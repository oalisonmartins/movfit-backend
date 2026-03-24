import { Injectable } from '@nestjs/common'
import { FocusMuscle, UserGoal } from 'generated/prisma/enums'

export type RegisterWorkoutConfigData = {
  userId: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles?: FocusMuscle[]
}

export type WorkoutConfigData = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
}

export type GetWorkoutConfigResultData = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
  goal: UserGoal
}

@Injectable()
export abstract class WorkoutConfigRepository {
  abstract registerWorkoutConfig(data: RegisterWorkoutConfigData): Promise<WorkoutConfigData>

  abstract getWorkoutConfig(userId: string): Promise<GetWorkoutConfigResultData | null>
}
