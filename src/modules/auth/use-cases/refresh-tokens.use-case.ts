import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { AuthOutput, JwtPayload } from 'src/modules/auth/types/auth.types'
import { RefreshTokensInput } from 'src/modules/auth/types/refresh-tokens.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class RefreshTokensUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: RefreshTokensInput): Promise<AuthOutput> {
    const { sub } = await this.jwtService.verifyAsync<JwtPayload>(input.refreshToken)
    const user = await this.usersRepository.findOneById(sub)

    if (!user) {
      throw new UnauthorizedException({
        message: 'Usuário inexistente',
        code: 'NONEXISTENT_USER',
      })
    }

    return this.authService.generateTokens(user)
  }
}
