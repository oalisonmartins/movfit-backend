import { Injectable, Scope } from '@nestjs/common'
import { DailyWaterConsumption, Profile, WorkoutConfig } from 'generated/prisma/client'
import { AuthUser } from '../types/auth-user.types'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: AuthUser
  private _profile: Profile
  private _workoutConfig: WorkoutConfig
  private _dailyWaterConsumption: DailyWaterConsumption

  set setUser(user: AuthUser) {
    this._user = user
  }

  set setProfile(profile: Profile) {
    this._profile = profile
  }

  set setWorkoutConfig(workoutConfig: WorkoutConfig) {
    this._workoutConfig = workoutConfig
  }

  set setDailyWaterConsumption(dailyWaterConsumption: DailyWaterConsumption) {
    this._dailyWaterConsumption = dailyWaterConsumption
  }

  get getUser(): AuthUser {
    return this._user
  }

  get getProfile(): Profile {
    return this._profile
  }

  get getWorkoutConfig(): WorkoutConfig {
    return this._workoutConfig
  }

  get getDailyWaterConsumption(): DailyWaterConsumption {
    return this._dailyWaterConsumption
  }

  get getUserId(): string {
    return this._user.id
  }
}
