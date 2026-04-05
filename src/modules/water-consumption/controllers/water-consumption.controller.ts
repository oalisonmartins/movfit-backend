import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetTodayNutritionProgressResponseDto } from 'src/modules/daily-nutrition/dtos/get-today-nutrition-progress.dto'
import { GetWaterConsumptionHistoryResponseDto } from '../dtos/get-water-consumption-history.dto'
import { RegisterTodayWaterConsumptionDto } from '../dtos/register-today-water-consumption.dto'
import { GetTodayWaterConsumptionProgressUseCase } from '../use-cases/get-today-water-consumption-progress.use-case'
import { GetWaterConsumptionHistoryUseCase } from '../use-cases/get-water-consumption-history.use-case'
import { RegisterTodayWaterConsumptionUseCase } from '../use-cases/register-today-water-consumption.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({
  path: '/water-consumption',
  version: '1',
})
export class WaterConsumptionController {
  constructor(
    private readonly getTodayWaterConsumptionProgressUseCase: GetTodayWaterConsumptionProgressUseCase,
    private readonly getWaterConsumptionHistoryUseCase: GetWaterConsumptionHistoryUseCase,
    private readonly registerRegisterTodayWaterConsumptionUseCase: RegisterTodayWaterConsumptionUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user daily water consumption progress.',
    type: GetTodayNutritionProgressResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getTodayWaterConsumptionProgress(@CurrentUser('basic') user: AuthUser) {
    return this.getTodayWaterConsumptionProgressUseCase.execute({
      userId: user.id,
    })
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get water consumption history.',
    type: [GetWaterConsumptionHistoryResponseDto],
  })
  @Get('/history')
  @HttpCode(HttpStatus.OK)
  getWaterConsumptionHistory(@CurrentUser('basic') user: AuthUser) {
    return this.getWaterConsumptionHistoryUseCase.execute({
      userId: user.id,
    })
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Register today water consumptions.',
  })
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  registerTodayWaterConsumption(
    @CurrentUser('basic') user: AuthUser,
    @Body() dto: RegisterTodayWaterConsumptionDto,
  ) {
    return this.registerRegisterTodayWaterConsumptionUseCase.execute({
      userId: user.id,
      amountConsumedInMl: dto.amountConsumedInMl,
    })
  }
}
