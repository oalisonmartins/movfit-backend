import { Injectable, Scope } from '@nestjs/common'
import { Diet, Profile, WorkoutConfig } from 'generated/prisma/client'
import { AuthUser } from '../types/auth-user.types'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: AuthUser
  private _profile: Profile
  private _workoutConfig: WorkoutConfig
  private _activeDiet: Diet

  set setUser(user: AuthUser) {
    this._user = user
  }

  set setProfile(profile: Profile) {
    this._profile = profile
  }

  set setWorkoutConfig(workoutConfig: WorkoutConfig) {
    this._workoutConfig = workoutConfig
  }

  set setActiveDiet(activeDiet: Diet) {
    this._activeDiet = activeDiet
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

  get getActiveDiet(): Diet {
    return this._activeDiet
  }

  get getUserId(): string {
    return this._user.id
  }
}
