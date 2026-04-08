import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { Payload } from '../types/payload.type'
import { SignupRequest, SignupResponse } from '../types/signup.type'

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignupRequest): Promise<SignupResponse> {
    const hashSalt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(input.password, hashSalt)
    const user = await this.usersRepo.getByEmail(input.email)
    if (user) {
      throw new ConflictException('E-mail already in use.')
    }
    const newUser = await this.usersRepo.create({ ...input, password: hash })
    const accessToken = await this.jwtService.signAsync<Payload>({ sub: newUser.id })
    return { accessToken }
  }
}
