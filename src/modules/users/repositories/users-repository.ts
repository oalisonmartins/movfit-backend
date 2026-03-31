import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { FindByUserIdInput } from 'src/common/types/find-by-user-id.type'
import { CompleteOnboardingInput } from '../types/complete-onboarding.type'
import { CreateUserInput } from '../types/create-user.type'
import { GetByEmailInput } from '../types/get-by-email.type'
import {
  SelectTimezone,
  UserAuth,
  UserSelectOnlyDiets,
  UserWithDietsAndTimezone,
  UserWithProfile,
  UserWithProfileAndWorkoutConfig,
} from '../types/users.type'

@Injectable()
export abstract class UsersRepository {
  abstract create(input: CreateUserInput): Promise<User>
  abstract findById(input: FindByUserIdInput): Promise<UserAuth | null>
  abstract findWithTimezone(input: FindByUserIdInput): Promise<SelectTimezone | null>
  abstract findWithDietsAndTimezone(
    input: FindByUserIdInput,
  ): Promise<UserWithDietsAndTimezone | null>
  abstract findWithProfile(input: FindByUserIdInput): Promise<UserWithProfile | null>
  abstract findByEmail(email: GetByEmailInput): Promise<UserAuth | null>
  abstract findByEmailForAuth(email: GetByEmailInput): Promise<User | null>
  abstract completeOnboarding(input: CompleteOnboardingInput): Promise<void>
  abstract getMe(input: FindByUserIdInput): Promise<UserWithProfileAndWorkoutConfig | null>
  abstract getDiets(input: FindByUserIdInput): Promise<UserSelectOnlyDiets | null>
}
