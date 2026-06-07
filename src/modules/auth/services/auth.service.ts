import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from 'generated/prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async signJwt<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      { sub, ...payload },
      {
        expiresIn,
        audience: this.configService.getOrThrow('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.getOrThrow('JWT_TOKEN_ISSUER'),
        secret: this.configService.getOrThrow('JWT_SECRET'),
        jwtid: randomUUID(),
      },
    )
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.signJwt(user.id, this.configService.getOrThrow('JWT_TOKEN_TTL')),
      await this.signJwt(user.id, this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')),
    ])

    return { accessToken, refreshToken }
  }
}
