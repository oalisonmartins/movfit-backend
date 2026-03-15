import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetMeUseCase } from '../use-cases/get-me.use-case';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { UpdateUserMetricsUseCase } from '../use-cases/update-user-metrics.use-case';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserMetricsUseCase: UpdateUserMetricsUseCase,
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

  @Patch('/metrics')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateUserMetrics(
    @Req() req: FastifyRequest,
    @Body() dto: UpdateUserMetricsInputDto,
  ) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateUserMetricsUseCase.execute(payload.sub, dto);
  }
}
