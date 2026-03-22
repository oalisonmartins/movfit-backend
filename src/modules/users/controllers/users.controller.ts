import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetMeUseCase } from '../use-cases/get-me.use-case';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { UpdateUserMetricsUseCase } from '../use-cases/update-user-metrics.use-case';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller({
  path: '/users',
  version: '3',
})
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserMetricsUseCase: UpdateUserMetricsUseCase,
    private readonly getMeUseCase: GetMeUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'GetMe',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: 'string' },
        goal: { type: 'string' },
        biologicalSex: { type: 'string' },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number' },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getMeUseCase.execute(payload);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UpdateUserMetrics',
    schema: {
      type: 'object',
      properties: {
        goal: { type: 'string' },
        biologicalSex: { type: 'string' },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number' },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Patch('/metrics')
  @UseGuards(JwtAuthGuard)
  updateUserMetrics(
    @Req() req: FastifyRequest,
    @Body() dto: UpdateUserMetricsInputDto,
  ) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateUserMetricsUseCase.execute(payload.sub, dto);
  }
}
