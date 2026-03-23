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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator';
import { UserDto } from '../../users/dtos/user.dto';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/daily-nutrition',
  version: '1',
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
  @HttpCode(HttpStatus.OK)
  getDailyNutrition(@AuthenticatedUser() user: UserDto) {
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
  @HttpCode(HttpStatus.OK)
  updateDailyNutrition(@Body() dto: UpdateDailyNutritionDto) {
    return this.updateDailyNutritionUseCase.execute(dto);
  }
}
