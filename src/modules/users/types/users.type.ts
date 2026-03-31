import { UserGetPayload } from 'generated/prisma/models'

export type UserWithProfileAndWorkoutConfig = UserGetPayload<{
  include: {
    profile: true
    workoutConfig: true
  }
}>

export type UserWithDietsAndProfileAndWaterConsumption = UserGetPayload<{
  include: {
    profile: true
    diets: true
    waterConsumptions: true
  }
}>

export type UserSelectOnlyDiets = UserGetPayload<{
  select: {
    diets: {
      include: { meals: { include: { consumedFoods: true } } }
    }
  }
}>

export type UserWithProfileAndWaterConsumption = UserGetPayload<{
  include: {
    profile: true
    waterConsumptions: true
  }
}>

export type PublicUser = UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    isOnboardingCompleted: true
  }
}>

export type UserWithProfile = UserGetPayload<{
  select: {
    profile: true
  }
}>

export type UserAuth = UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    passwordHash: true
    isOnboardingCompleted: true
  }
}>

export type SelectTimezone = UserGetPayload<{
  select: { profile: { select: { timezone: true } } }
}>

export type UserWithDietsAndTimezone = UserGetPayload<{
  select: {
    diets: true
    profile: {
      select: {
        timezone: true
      }
    }
  }
}>
