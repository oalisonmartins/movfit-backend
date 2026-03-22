import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users-repository';
import { HashRepository } from 'src/modules/hash/repositories/hash.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashRepository: HashRepository,
  ) {}

  async execute({ name, email, birthDate, password }: CreateUserInputDto) {
    const hash = await this.hashRepository.hash(password);

    const user = await this.usersRepository.getByEmail(email);

    if (user) {
      throw new ConflictException({
        message: 'Email already in use.',
        code: 'EMAIL_ALREADY_IN_USE',
      });
    }

    return this.usersRepository.create({
      name,
      email,
      birthDate,
      password: hash,
    });
  }
}
