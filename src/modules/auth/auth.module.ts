import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { RequestContextService } from 'src/common/services/request-context.service'
import { AuthController } from 'src/modules/auth/controllers/auth.controller'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { BcryptHashingService } from 'src/modules/auth/services/bcrypt-hashing.service'
import { HashingService } from 'src/modules/auth/services/hashing.service'
import { TokenBlacklistService } from 'src/modules/auth/services/token-blacklist.service'
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy'
import { RefreshTokensUseCase } from 'src/modules/auth/use-cases/refresh-tokens.use-case'
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
          expiresIn: config.getOrThrow('JWT_TOKEN_TTL'),
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
  providers: [
    SigninUseCase,
    SignupUseCase,
    SignoutUseCase,
    RefreshTokensUseCase,
    AuthService,
    RequestContextService,
    TokenBlacklistService,
    JwtStrategy,
    {
      provide: HashingService,
      useClass: BcryptHashingService,
    },
  ],
})
export class AuthModule {}
