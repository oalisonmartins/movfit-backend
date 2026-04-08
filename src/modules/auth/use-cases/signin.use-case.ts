import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { Payload } from '../types/payload.type'
import { SigninRequest, SigninResponse } from '../types/signin.type'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SigninRequest): Promise<SigninResponse> {
    const user = await this.usersRepo.getByEmailForAuth(input.email)
    if (!user) {
      throw new BadRequestException('Invalid e-mail or password.')
    }
    const isPasswordMatch = await bcrypt.compare(input.password, user.passwordHash)
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid e-mail or password.')
    }
    const accessToken = await this.jwtService.signAsync<Payload>({ sub: user.id })
    return { accessToken }
  }
}
