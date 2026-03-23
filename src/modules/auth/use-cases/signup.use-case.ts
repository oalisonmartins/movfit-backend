import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { SignupInputDto, SignupOutputDto } from '../dtos/signup.dto'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: SignupInputDto): Promise<SignupOutputDto> {
    const hash = await bcrypt.hash(data.password, 12)
    const user = await this.usersRepository.getByEmail(data.email)

    if (user) {
      throw new HttpException('Email already in use.', HttpStatus.CONFLICT)
    }

    const newUser = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      password: hash,
    })

    return {
      accessToken: this.jwtService.sign({
        sub: newUser.id,
      }),
    }
  }
}
