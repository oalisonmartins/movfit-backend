import 'dotenv/config';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import jwtConfig from './config/jwt.config';
import { LoginUseCase } from './use-cases/login.use-case';
import { AuthController } from './controllers/auth.controller';
import { HashModule } from '../hash/hash.module';

@Module({
  controllers: [AuthController],
  providers: [LoginUseCase],
  imports: [
    UsersModule,
    HashModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: {
          issuer: config.issuer,
          audience: config.audience,
          expiresIn: config.expiresIn,
        },
      }),
    }),
  ],
})
export class AuthModule {}
