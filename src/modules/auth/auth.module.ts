import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { RequestContextService } from 'src/common/services/request-context.service'
import { AuthController } from 'src/modules/auth/controllers/auth.controller'
import { TokenBlacklistService } from 'src/modules/auth/services/token-blacklist.service'
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy'
import { SigninUseCase } from 'src/modules/auth/use-cases/signin.use-case'
import { SignoutUseCase } from 'src/modules/auth/use-cases/signout.use-case'
import { SignupUseCase } from 'src/modules/auth/use-cases/signup.use-case'
import { UsersModule } from 'src/modules/users/users.module'

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
  providers: [RequestContextService, TokenBlacklistService, JwtStrategy, SigninUseCase, SignupUseCase, SignoutUseCase],
})
export class AuthModule {}
