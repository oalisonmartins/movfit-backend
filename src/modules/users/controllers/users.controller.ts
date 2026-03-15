import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';

@Controller('/users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  createUser(@Body() dto: CreateUserInputDto) {
    return this.createUserUseCase.execute(dto);
  }
}
