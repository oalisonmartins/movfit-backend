import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { LoginInputDto } from '../dtos/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { CreateUserInputDto } from 'src/modules/users/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user.use-case';
import { ApiResponse } from '@nestjs/swagger';

@Controller({
  path: '/auth',
  version: '3',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  @Post('/login')
  async login(@Body(new ValidationPipe()) dto: LoginInputDto) {
    return this.loginUseCase.execute(dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'SignUp.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        goal: { type: 'string' },
        birthDate: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        biologicalSex: { type: 'string' },
      },
    },
  })
  @Post('/sign-up')
  async signUp(@Body(new ValidationPipe()) dto: CreateUserInputDto) {
    return this.createUserUseCase.execute(dto);
  }
}
