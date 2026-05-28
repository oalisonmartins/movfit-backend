import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenBlacklistService } from 'src/modules/auth/services/token-blacklist.service'
import { JwtPayload } from 'src/modules/auth/types/auth.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
      issuer: process.env.JWT_TOKEN_ISSUER as string,
      audience: process.env.JWT_TOKEN_AUDIENCE as string,
      ignoreExpiration: false,
    })
  }

  async validate(payload: JwtPayload) {
    const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(payload.jti)

    if (isBlacklisted) {
      throw new HttpException(
        {
          message: 'Seu token foi revogado',
          code: 'REVOKED_TOKEN',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }

    const user = await this.usersRepository.findOneById(payload.sub)

    if (!user) {
      throw new HttpException(
        {
          message: 'Usuário não encontrado',
          code: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return {
      id: user.id,
      email: user.email,
      isOnboardingCompleted: user.isOnboardingCompleted,
    }
  }
}
