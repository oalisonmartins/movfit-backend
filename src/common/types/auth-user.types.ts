import { Profile } from 'generated/prisma/client'

export type AuthUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  isOnboardingCompleted: boolean
}

export type AuthUserWithProfile = AuthUser & {
  profile: Profile | null
}
