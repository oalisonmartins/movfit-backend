import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { LoginInputDto, LoginOutputDto } from '../dtos/login.dto'

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginInputDto): Promise<LoginOutputDto> {
    const user = await this.usersRepository.getByEmailForAuth(data.email)

    if (!user) {
      throw new BadRequestException('Invalid email/password.')
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.passwordHash)

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid email/password.')
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
    }
  }
}
