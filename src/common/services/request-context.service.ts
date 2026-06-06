import { Injectable, Scope } from '@nestjs/common'
import { Diet, DietPreference, Profile, WorkoutPreference } from 'generated/prisma/client'
import { AuthUser } from '../types/auth-user.types'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: AuthUser
  private _profile: Profile
  private _activeDiet: Diet

  private _workoutPreference: WorkoutPreference
  private _dietPreference: DietPreference

  set setUser(user: AuthUser) {
    this._user = user
  }

  set setProfile(profile: Profile) {
    this._profile = profile
  }

  set setActiveDiet(activeDiet: Diet) {
    this._activeDiet = activeDiet
  }

  set setWorkoutPreference(workoutPreWorkoutPreference: WorkoutPreference) {
    this._workoutPreference = workoutPreWorkoutPreference
  }

  set setDietPreference(dietPreference: DietPreference) {
    this._dietPreference = dietPreference
  }

  get getUser(): AuthUser {
    return this._user
  }

  get getProfile(): Profile {
    return this._profile
  }

  get getWorkoutPreference(): WorkoutPreference {
    return this._workoutPreference
  }

  get getDietPreference(): DietPreference {
    return this._dietPreference
  }

  get getActiveDiet(): Diet {
    return this._activeDiet
  }

  get getUserId(): string {
    return this._user.id
  }
}
