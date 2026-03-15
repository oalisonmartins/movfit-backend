import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetMeUseCase } from '../use-cases/get-me.use-case';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @Post()
  createUser(@Body() dto: CreateUserInputDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getMeUseCase.execute(payload);
  }
}
