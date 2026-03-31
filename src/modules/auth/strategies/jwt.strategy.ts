import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { Payload } from '../types/payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
      issuer: process.env.JWT_TOKEN_ISSUER as string,
      audience: process.env.JWT_TOKEN_AUDIENCE as string,
      ignoreExpiration: false,
    })
  }

  async validate(payload: Payload) {
    const user = await this.usersRepository.findById({
      userId: payload.sub,
    })

    if (!user) {
      return null
    }

    return user
  }
}
