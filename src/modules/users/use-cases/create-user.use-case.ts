import { Injectable } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: CreateUserInputDto) {
    const user = await this.usersRepository.create(dto);
    return user;
  }
}
