import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';

import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.me(userId);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }
}
