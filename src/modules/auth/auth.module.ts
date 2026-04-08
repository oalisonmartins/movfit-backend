import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controller/auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { SigninUseCase } from './use-cases/signin.use-case'
import { SignupUseCase } from './use-cases/signup.use-case'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: {
          issuer: config.getOrThrow('JWT_TOKEN_ISSUER'),
          audience: config.getOrThrow('JWT_TOKEN_AUDIENCE'),
          expiresIn: '7d',
        },
        verifyOptions: {
          issuer: config.getOrThrow('JWT_TOKEN_ISSUER'),
          audience: config.getOrThrow('JWT_TOKEN_AUDIENCE'),
          ignoreExpiration: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [SigninUseCase, SignupUseCase],
  providers: [JwtStrategy, SigninUseCase, SignupUseCase],
})
export class AuthModule {}
