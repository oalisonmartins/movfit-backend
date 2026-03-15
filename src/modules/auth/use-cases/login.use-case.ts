import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';

import { LoginInputDto, LoginOutputDto } from '../dtos/login.dto';
import { HashRepository } from '../../hash/repositories/hash.repository';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashRepository: HashRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException({
        message: 'Invalid email/password.',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      });
    }

    const isPasswordMatch = await this.hashRepository.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'Invalid email/password.',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      });
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        age: user.age,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.expiresIn,
      },
    );

    return {
      accessToken: token,
    };
  }
}
