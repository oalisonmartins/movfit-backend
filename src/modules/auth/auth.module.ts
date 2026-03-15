import 'dotenv/config';

import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { LoginUseCase } from './use-cases/login.use-case';
import { AuthController } from './controllers/auth.controller';
import { HashModule } from '../hash/hash.module';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [UsersModule, HashModule, JwtAuthModule],
  providers: [LoginUseCase],
  exports: [LoginUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
