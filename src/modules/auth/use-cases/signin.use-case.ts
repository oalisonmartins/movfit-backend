import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { AuthOutput } from 'src/modules/auth/types/auth.types'
import { Payload } from 'src/modules/auth/types/payload.types'
import { SigninInput } from 'src/modules/auth/types/signin.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SigninInput): Promise<AuthOutput> {
    const user = await this.usersRepository.findOneByEmail(input.email)

    if (!user) {
      throw new HttpException(
        {
          message: 'E-mail ou senha inválidos.',
          code: 'INVALID_EMAIL_OR_PASSWORD',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const isPasswordMatch = await bcrypt.compare(input.password, user.passwordHash)

    if (!isPasswordMatch) {
      throw new HttpException(
        {
          message: 'E-mail ou senha inválidos.',
          code: 'INVALID_EMAIL_OR_PASSWORD',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const accessToken = await this.jwtService.signAsync<Payload>({
      sub: user.id,
    })

    return {
      accessToken,
    }
  }
}
