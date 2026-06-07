import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenBlacklistService } from 'src/modules/auth/services/token-blacklist.service'
import { JwtPayload } from 'src/modules/auth/types/auth.types'
import { SignoutInput } from 'src/modules/auth/types/signout.types'

@Injectable()
export class SignoutUseCase {
  constructor(
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignoutInput) {
    const [
      { jti: accessTokenJti, exp: accessTokenExp },
      { jti: refreshTokenJti, exp: refreshTokenExp },
    ] = await Promise.all([
      this.jwtService.verifyAsync<JwtPayload>(input.accessToken),
      this.jwtService.verifyAsync<JwtPayload>(input.refreshToken),
    ])

    const accessTokenTtl = Math.max(0, accessTokenExp - Math.floor(Date.now() / 1000))
    const refreshTokenTtl = Math.max(0, refreshTokenExp - Math.floor(Date.now() / 1000))

    await Promise.all([
      this.tokenBlacklistService.blacklist(accessTokenJti, accessTokenTtl),
      this.tokenBlacklistService.blacklist(refreshTokenJti, refreshTokenTtl),
    ])
  }
}
