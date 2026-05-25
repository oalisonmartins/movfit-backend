import { Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { CreateHydrationLogDto } from 'src/modules/hydration/log/dtos/create-log.dto'
import { GetHydrationHistoryDto } from 'src/modules/hydration/log/dtos/get-history.dto'
import { GetHydrationLogDto } from 'src/modules/hydration/log/dtos/get-log.dto'
import { CreateHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/create-log.use-case'
import { GetHydrationHistoryUseCase } from 'src/modules/hydration/log/use-cases/get-history.use-case'
import { GetHydrationLogUseCase } from 'src/modules/hydration/log/use-cases/get-log.use-case'
import { GetHydrationProgressUseCase } from 'src/modules/hydration/log/use-cases/get-progress.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('hydration/log')
export class HydrationLogController {
  constructor(
    private readonly createHydrationLogUseCase: CreateHydrationLogUseCase,
    private readonly getHydrationLogUseCase: GetHydrationLogUseCase,
    private readonly getHydrationProgressUseCase: GetHydrationProgressUseCase,
    private readonly getHydrationHistoryUseCase: GetHydrationHistoryUseCase,
  ) {}

  @RequireProfile()
  @RequireWorkoutConfig()
  @UseInterceptors(ProfileInterceptor, WorkoutConfigInterceptor)
  @ApiCreatedResponse({ type: CreateHydrationLogDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createHydrationLog() {
    return this.createHydrationLogUseCase.execute()
  }

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @Get()
  getHydrationLog(@Query() query: GetHydrationLogDto) {
    return this.getHydrationLogUseCase.execute(query.date)
  }

  @Get('progress')
  getHydrationLogProgress() {
    return this.getHydrationProgressUseCase.execute()
  }

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @Get('history')
  getHydrationHistory(@Query() query: GetHydrationHistoryDto) {
    return this.getHydrationHistoryUseCase.execute(query.from, query.to)
  }
}
