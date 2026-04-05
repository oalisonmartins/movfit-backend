import { Profile, WorkoutConfig } from 'generated/prisma/client'

export type PublicUser = {
  id: string
  name: string
  email: string
  isOnboardingCompleted: boolean
}

export type PublicUserWithProfileAndWorkoutConfig = PublicUser & {
  profile: Profile | null
  workoutConfig: WorkoutConfig | null
}
