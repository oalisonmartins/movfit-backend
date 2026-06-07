import { ConflictException, Injectable } from '@nestjs/common'
import { AuthService } from 'src/modules/auth/services/auth.service'
import { HashingService } from 'src/modules/auth/services/hashing.service'
import { AuthOutput } from 'src/modules/auth/types/auth.types'
import { SignupInput } from 'src/modules/auth/types/signup.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly authService: AuthService,
  ) {}

  async execute(input: SignupInput): Promise<AuthOutput> {
    const hash = await this.hashingService.hash(input.password)
    const existingUser = await this.usersRepository.findOneByEmail(input.email)

    if (existingUser) {
      throw new ConflictException({
        message: 'Este e-mail já está em uso.',
        code: 'EMAIL_ALREADY_IN_USE',
      })
    }

    const user = await this.usersRepository.create({
      ...input,
      password: hash,
    })

    return await this.authService.generateTokens(user)
  }
}
