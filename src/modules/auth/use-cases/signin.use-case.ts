import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { Payload } from '../types/payload.type'
import { SigninOutput } from '../types/signin.type'
import { SignupInput } from '../types/signup.type'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignupInput): Promise<SigninOutput> {
    const user = await this.usersRepository.findByEmailForAuth({
      email: input.email,
    })

    if (!user) {
      throw new BadRequestException('Invalid email or password.')
    }

    const isPasswordMatch = await bcrypt.compare(input.password, user.passwordHash)

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email or password.')
    }

    const accessToken = await this.jwtService.signAsync<Payload>({
      sub: user.id,
    })

    return {
      accessToken,
    }
  }
}
