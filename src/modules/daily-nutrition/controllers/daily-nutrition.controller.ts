import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetDailyNutritionUseCase } from '../use-cases/get-daily-nutrition.use-case';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { UpdateDailyNutritionUseCase } from '../use-cases/update-daily-nutrition.use-case';
import { ApiResponse } from '@nestjs/swagger';

@Controller({
  path: '/daily-nutrition',
  version: '3',
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
  @UseGuards(JwtAuthGuard)
  getDailyNutrition(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getDailyNutritionUseCase.execute(payload.sub);
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
  @UseGuards(JwtAuthGuard)
  updateDailyNutrition(
    @Req() req: FastifyRequest,
    @Body() dto: UpdateDailyNutritionDto,
  ) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateDailyNutritionUseCase.execute(payload.sub, dto);
  }
}
