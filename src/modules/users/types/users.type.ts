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

export type UserWithProfileAndWaterConsumption = UserGetPayload<{
  include: {
    profile: true
    waterConsumptions: true
  }
}>

export type UserWithProfile = UserGetPayload<{
  select: {
    profile: true
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
