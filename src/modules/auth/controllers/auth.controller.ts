import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginInputDto } from '../dtos/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { ApiResponse } from '@nestjs/swagger';
import { SignupUseCase } from '../use-cases/signup.use-case';
import { SignupInputDto } from '../dtos/signup.dto';

@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          format: 'password',
          uniqueItems: true,
        },
      },
    },
  })
  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginInputDto) {
    return this.loginUseCase.execute(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SignUp.',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          format: 'password',
          uniqueItems: true,
        },
      },
    },
  })
  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() dto: SignupInputDto) {
    return this.signupUseCase.execute(dto);
  }
}
