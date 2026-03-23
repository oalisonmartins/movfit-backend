import 'dotenv/config';

import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { LoginUseCase } from './use-cases/login.use-case';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SignupUseCase } from './use-cases/signup.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        issuer: process.env.JWT_TOKEN_ISSUER,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        expiresIn: '7d',
      },
      verifyOptions: {
        issuer: process.env.JWT_TOKEN_ISSUER,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        ignoreExpiration: false,
      },
    }),
  ],
  providers: [LoginUseCase, SignupUseCase, JwtStrategy],
  exports: [LoginUseCase, SignupUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
