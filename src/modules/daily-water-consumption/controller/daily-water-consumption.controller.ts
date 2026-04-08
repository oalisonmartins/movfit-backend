import { Controller, HttpCode, HttpStatus, Patch, UseGuards, UseInterceptors } from '@nestjs/common'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { CalculateDailyWaterConsumptionUseCase } from '../use-cases/calculate-daily-water-consumption.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/daily-water-consumption', version: '1' })
export class DailyWaterConsumptionController {
  constructor(
    private readonly calculateDailyWaterConsumptionUseCase: CalculateDailyWaterConsumptionUseCase,
  ) {}

  @RequireWorkoutConfig()
  @RequireProfile()
  @UseInterceptors(WorkoutConfigInterceptor, ProfileInterceptor)
  @Patch()
  @HttpCode(HttpStatus.CREATED)
  calculateDailyWaterConsumption() {
    return this.calculateDailyWaterConsumptionUseCase.execute()
  }
}
