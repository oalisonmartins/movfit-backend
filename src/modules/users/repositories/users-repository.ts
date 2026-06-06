import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { UserUpdateInput } from 'generated/prisma/models'
import { CreateUserInput } from '../types/create-user.type'

@Injectable()
export abstract class UsersRepository {
  abstract create(input: CreateUserInput): Promise<User>
  abstract findOneById(userId: string): Promise<User | null>
  abstract findOneByEmail(email: string): Promise<User | null>
  abstract update(userId: string, input: UserUpdateInput): Promise<User>
}
