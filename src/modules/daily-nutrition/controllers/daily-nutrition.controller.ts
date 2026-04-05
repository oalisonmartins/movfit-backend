import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetTodayNutritionProgressResponseDto } from '../dtos/get-today-nutrition-progress.dto'
import {
  UpdateTodayNutritionRequestDto,
  UpdateTodayNutritionResponseDto,
} from '../dtos/update-today-nutrition.dto'
import { GetTodayNutritionProgressUseCase } from '../use-cases/get-today-nutrition-progress.use-case'
import { UpdateTodayNutritionProgressUseCase } from '../use-cases/update-today-nutrition-progress.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({
  path: '/daily-nutrition',
  version: '1',
})
export class DailyNutritionController {
  constructor(
    private readonly getTodayGetTodayNutritionProgressUseCase: GetTodayNutritionProgressUseCase,
    private readonly updateUpdateTodayNutritionProgressUseCase: UpdateTodayNutritionProgressUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get today nutrition progress.',
    type: GetTodayNutritionProgressResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getTodayNutritionProgress(@CurrentUser() user: AuthUser) {
    return this.getTodayGetTodayNutritionProgressUseCase.execute(user.id)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update today nutrition.',
    type: UpdateTodayNutritionResponseDto,
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  updateTodayNutritionProgress(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateTodayNutritionRequestDto,
  ) {
    return this.updateUpdateTodayNutritionProgressUseCase.execute({
      userId: user.id,
      carbsInGrams: dto.carbsInGrams,
      fatsInGrams: dto.fatsInGrams,
      proteinsInGrams: dto.proteinsInGrams,
    })
  }
}
