export type AuthUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  hasCompletedOnboarding: boolean
}
