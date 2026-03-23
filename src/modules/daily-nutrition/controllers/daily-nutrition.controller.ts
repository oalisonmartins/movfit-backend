import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetDailyNutritionUseCase } from '../use-cases/get-daily-nutrition.use-case';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { UpdateDailyNutritionUseCase } from '../use-cases/update-daily-nutrition.use-case';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/modules/auth/decorators/authenticated-user.decorator';
import type { User } from 'generated/prisma/client';

@Controller({
  path: '/daily-nutrition',
  version: '4',
})
export class DailyNutritionController {
  constructor(
    private readonly getDailyNutritionUseCase: GetDailyNutritionUseCase,
    private readonly updateDailyNutritionUseCase: UpdateDailyNutritionUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'GetDailyNutrition',
    schema: {
      type: 'object',
      properties: {
        carbohydrates: {
          type: 'object',
          properties: {
            goal: { type: 'number' },
            consumed: { type: 'number' },
            percentage: { type: 'number' },
          },
        },
        proteins: {
          type: 'object',
          properties: {
            goal: { type: 'number' },
            consumed: { type: 'number' },
            percentage: { type: 'number' },
          },
        },
        fats: {
          type: 'object',
          properties: {
            goal: { type: 'number' },
            consumed: { type: 'number' },
            percentage: { type: 'number' },
          },
        },
      },
    },
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  getDailyNutrition(@AuthenticatedUser() user: User) {
    return this.getDailyNutritionUseCase.execute(user.id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UpdateDailyNutrition',
    schema: {
      type: 'object',
      properties: {
        day: { type: 'string' },
        fatsInGrams: { type: 'number' },
        carbsInGrams: { type: 'number' },
        proteinsInGrams: { type: 'number' },
      },
    },
  })
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  updateDailyNutrition(
    @AuthenticatedUser() user: User,
    @Body() dto: UpdateDailyNutritionDto,
  ) {
    return this.updateDailyNutritionUseCase.execute(user.id, dto);
  }
}
