import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { AuthOutput } from 'src/modules/auth/types/auth.types'
import { Payload } from 'src/modules/auth/types/payload.types'
import { SignupInput } from 'src/modules/auth/types/signup.types'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignupInput): Promise<AuthOutput> {
    const hashSalt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(input.password, hashSalt)
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

    const accessToken = await this.jwtService.signAsync<Payload>({
      sub: newUser.id,
    })

    return {
      accessToken,
    }
  }
}
