import { Injectable } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users-repository';
import { HashRepository } from 'src/modules/hash/repositories/hash.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashRepository: HashRepository,
  ) {}

  async execute({ name, email, age, password }: CreateUserInputDto) {
    const hash = await this.hashRepository.hash(password);
    return this.usersRepository.create({ name, email, age, password: hash });
  }
}
