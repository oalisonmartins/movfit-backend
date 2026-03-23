import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';

import { LoginInputDto, LoginOutputDto } from '../dtos/login.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.usersRepository.getByEmailWithPassword(data.email);

    if (!user) {
      throw new HttpException(
        'Invalid email/password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        'Invalid email/password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
    };
  }
}
