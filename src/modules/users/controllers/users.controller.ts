import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { GetUserUseCase } from '../use-cases/get-user.use-case';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Get()
  getMe(@Query('userId') userId: string) {
    return this.getUserUseCase.execute(userId);
  }

  @Post()
  createUser(@Body() dto: CreateUserInputDto) {
    return this.createUserUseCase.execute(dto);
  }
}
