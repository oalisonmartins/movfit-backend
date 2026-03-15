import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { LoginInputDto } from '../dtos/login.dto';
import { LoginUseCase } from '../use-cases/login.use-case';
import { AuthTokenGuard } from '../guards/auth.guard';
import { CreateUserInputDto } from 'src/modules/users/dtos/create-user.dto';
import { CreateUserUseCase } from 'src/modules/users/use-cases/create-user.use-case';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('/login')
  async login(@Body(new ValidationPipe()) dto: LoginInputDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('/sign-up')
  async signUp(@Body(new ValidationPipe()) dto: CreateUserInputDto) {
    return this.createUserUseCase.execute(dto);
  }
}
