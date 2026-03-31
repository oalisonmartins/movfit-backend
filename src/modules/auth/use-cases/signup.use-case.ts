import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { Payload } from '../types/payload.type'
import { SignupInput, SignupOutput } from '../types/signup.type'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const hashSalt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(input.password, hashSalt)

    const user = await this.usersRepository.findByEmail({
      email: input.email,
    })

    if (user) {
      throw new ConflictException('Email already in use.')
    }

    const createdUser = await this.usersRepository.create({
      name: input.name,
      email: input.email,
      password: hash,
    })

    const accessToken = await this.jwtService.signAsync<Payload>({
      sub: createdUser.id,
    })

    return {
      accessToken,
    }
  }
}
