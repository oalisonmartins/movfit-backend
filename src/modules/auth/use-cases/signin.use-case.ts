import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { HashingService } from 'src/modules/auth/services/hashing.service'
import { AuthOutput } from 'src/modules/auth/types/auth.types'
import { SigninInput } from 'src/modules/auth/types/signin.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly authService: AuthService,
  ) {}

  async execute(input: SigninInput): Promise<AuthOutput> {
    const user = await this.usersRepository.findOneByEmail(input.email)

    if (!user) {
      throw new BadRequestException({
        message: 'E-mail ou senha inválidos.',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      })
    }

    const isPasswordMatch = await this.hashingService.compare(input.password, user.passwordHash)

    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'E-mail ou senha inválidos.',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      })
    }

    return await this.authService.generateTokens(user)
  }
}
