import { randomUUID } from 'node:crypto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HashingService } from 'src/modules/auth/services/hashing.service'
import { AuthOutput } from 'src/modules/auth/types/auth.types'
import { SignupInput } from 'src/modules/auth/types/signup.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: SignupInput): Promise<AuthOutput> {
    const hash = await this.hashingService.hash(input.password)
    const user = await this.usersRepository.findOneByEmail(input.email)

    if (user) {
      throw new HttpException(
        {
          message: 'Este e-mail já está em uso.',
          code: 'EMAIL_ALREADY_IN_USE',
        },
        HttpStatus.CONFLICT,
      )
    }

    const newUser = await this.usersRepository.create({
      ...input,
      password: hash,
    })

    // TODO: Estudar e implementar um refresh token
    const accessToken = await this.jwtService.signAsync(
      {
        sub: newUser.id,
      },
      { jwtid: randomUUID() },
    )

    return {
      accessToken,
    }
  }
}
