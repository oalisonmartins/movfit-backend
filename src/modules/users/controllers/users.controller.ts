import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { GetMeUseCase } from '../use-cases/get-me.use-case';
import { UpdateUserMetricsUseCase } from '../use-cases/update-user-metrics.use-case';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';
import { AuthenticatedUser } from 'src/modules/auth/decorators/authenticated-user.decorator';
import type { User } from 'generated/prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: '/users',
  version: '4',
})
export class UsersController {
  constructor(
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
        email: { type: 'string', format: 'email', uniqueItems: true },
        birthDate: { type: 'string', format: 'date' },
        goal: {
          type: 'string',
          enum: [UserGoal],
        },
        biologicalSex: { type: 'string', enum: [BiologicalSex] },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number', maximum: 240 },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  getMe(@AuthenticatedUser() user: User) {
    return this.getMeUseCase.execute(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UpdateUserMetrics',
    schema: {
      type: 'object',
      properties: {
        goal: {
          type: 'string',
          enum: [UserGoal],
        },
        biologicalSex: { type: 'string', enum: [BiologicalSex] },
        weightInGrams: { type: 'number' },
        heightInCentimeters: { type: 'number', maximum: 240 },
        goalWeightInGrams: { type: 'number' },
      },
    },
  })
  @Patch('/metrics')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  updateUserMetrics(
    @AuthenticatedUser() user: User,
    @Body() dto: UpdateUserMetricsInputDto,
  ) {
    return this.updateUserMetricsUseCase.execute(user.id, dto);
  }
}
