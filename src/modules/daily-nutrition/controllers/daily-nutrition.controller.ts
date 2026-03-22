import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetDailyNutritionUseCase } from '../use-cases/get-daily-nutrition.use-case';
import { UpdateDailyNutritionDto } from '../dtos/update-daily-nutrition.dto';
import { UpdateDailyNutritionUseCase } from '../use-cases/update-daily-nutrition.use-case';

@Controller('/daily-nutrition')
export class DailyNutritionController {
  constructor(
    private readonly getDailyNutritionUseCase: GetDailyNutritionUseCase,
    private readonly updateDailyNutritionUseCase: UpdateDailyNutritionUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getDailyNutrition(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getDailyNutritionUseCase.execute(payload.sub);
  }

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
