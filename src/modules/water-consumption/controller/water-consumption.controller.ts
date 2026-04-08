import { Body, Controller, Get, Patch, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { RequireDailyWaterConsumption } from 'src/common/decorators/require-daily-water-consumption.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { DailyWaterConsumptionInterceptor } from 'src/common/interceptors/daily-water-consumption.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetWaterConsumptionHistoryQueryDTO } from '../dtos/get-water-consumption-history-query.dto'
import { RegisterWaterConsumptionRequestDTO } from '../dtos/register-water-consumption.dto'
import { GetWaterConsumptionHistoryUseCase } from '../use-cases/get-water-consumption-history.use-case'
import { GetWaterConsumptionProgressUseCase } from '../use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from '../use-cases/register-water-consumption.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/water-consumption', version: '1' })
export class WaterConsumptionController {
  constructor(
    private readonly getWaterConsumptionHistoryUseCase: GetWaterConsumptionHistoryUseCase,
    private readonly getWaterConsumptionProgressUseCase: GetWaterConsumptionProgressUseCase,
    private readonly registerWaterConsumptionUseCase: RegisterWaterConsumptionUseCase,
  ) {}

  @Get('/history')
  getWaterConsumptionHistory(
    @CurrentUser() user: AuthUser,
    @Query() query: GetWaterConsumptionHistoryQueryDTO,
  ) {
    return this.getWaterConsumptionHistoryUseCase.execute(user.id, query)
  }

  @RequireDailyWaterConsumption()
  @RequireProfile()
  @UseInterceptors(DailyWaterConsumptionInterceptor, ProfileInterceptor)
  @Get('/progress')
  getWaterConsumptionProgress(@CurrentUser() user: AuthUser) {
    return this.getWaterConsumptionProgressUseCase.execute(user.id)
  }

  @RequireDailyWaterConsumption()
  @RequireProfile()
  @UseInterceptors(DailyWaterConsumptionInterceptor, ProfileInterceptor)
  @Patch()
  registerWaterConsumption(@Body() dto: RegisterWaterConsumptionRequestDTO) {
    return this.registerWaterConsumptionUseCase.execute(dto)
  }
}
