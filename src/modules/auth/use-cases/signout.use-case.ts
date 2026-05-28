import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenBlacklistService } from 'src/modules/auth/services/token-blacklist.service'
import { JwtPayload } from 'src/modules/auth/types/auth.types'

@Injectable()
export class SignoutUseCase {
  constructor(
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string) {
    const { jti, exp } = this.jwtService.decode<JwtPayload>(token)
    const ttl = exp - Math.floor(Date.now() / 1000)
    await this.tokenBlacklistService.blacklist(jti, ttl)
  }
}
