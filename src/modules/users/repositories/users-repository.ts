import { Injectable } from '@nestjs/common'
import { AuthUser, AuthUserWithProfile } from 'src/common/types/auth-user.types'
import {
  PublicUser,
  PublicUserWithProfileAndWorkoutConfig,
} from 'src/common/types/public-user.types'
import { CreateUserInput } from '../types/create-user.type'
import { SelectTimezone, UserWithDietsAndTimezone, UserWithProfile } from '../types/users.type'

@Injectable()
export abstract class UsersRepository {
  abstract me(userId: string): Promise<PublicUserWithProfileAndWorkoutConfig | null>
  abstract create(input: CreateUserInput): Promise<PublicUser>

  abstract getAuthUserWithProfile(userId: string): Promise<AuthUserWithProfile | null>

  abstract getById(userId: string): Promise<AuthUser | null>
  abstract getByEmail(email: string): Promise<PublicUser | null>
  abstract getByEmailForAuth(email: string): Promise<AuthUser | null>

  abstract findWithTimezone(userId: string): Promise<SelectTimezone | null>
  abstract findWithDietsAndTimezone(userId: string): Promise<UserWithDietsAndTimezone | null>
  abstract findWithProfile(userId: string): Promise<UserWithProfile | null>
}
