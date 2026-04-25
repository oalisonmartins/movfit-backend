import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { GetDailyWaterConsumptionUseCase } from '../use-cases/get-daily-water-consumption.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@UseInterceptors(WorkoutConfigInterceptor, ProfileInterceptor)
@Controller({ path: '/daily-water-consumption', version: '1' })
export class DailyWaterConsumptionController {
  constructor(private readonly getDailyWaterConsumptionUseCase: GetDailyWaterConsumptionUseCase) {}

  @Get()
  @RequireWorkoutConfig()
  @RequireProfile()
  getDailyWaterConsumption() {
    return this.getDailyWaterConsumptionUseCase.execute()
  }
}
