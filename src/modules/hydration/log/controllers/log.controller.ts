import { Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { CreateHydrationLogDto } from 'src/modules/hydration/log/dtos/create-log.dto'
import { GetHydrationLogDto } from 'src/modules/hydration/log/dtos/get-log.dto'
import { CreateHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/create-log.use-case'
import { GetHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/get-log.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('hydration/log')
export class HydrationLogController {
  constructor(
    private readonly createHydrationLogUseCase: CreateHydrationLogUseCase,
    private readonly getHydrationLogUseCase: GetHydrationLogUseCase,
  ) {}

  @RequireProfile()
  @RequireWorkoutConfig()
  @UseInterceptors(ProfileInterceptor, WorkoutConfigInterceptor)
  @Post()
  @ApiResponse({ type: CreateHydrationLogDto })
  createHydrationLog() {
    return this.createHydrationLogUseCase.execute()
  }

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @Get()
  getHydrationLog(@Query() query: GetHydrationLogDto) {
    return this.getHydrationLogUseCase.execute(query.date)
  }
}
