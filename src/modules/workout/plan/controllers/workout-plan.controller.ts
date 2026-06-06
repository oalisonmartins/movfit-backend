import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import { CreateWorkoutPlanRequestDto } from 'src/modules/workout/plan/dtos/create-workout-plan.dto'
import { ActiveWorkoutPlanDto } from 'src/modules/workout/plan/dtos/workout-plan.dto'
import { CreateWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/create-workout-plan.use-case'
import { GetActiveWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/get-active-workout-plan.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('workout/plan')
export class WorkoutPlanController {
  constructor(
    private readonly createWorkoutPlanUseCase: CreateWorkoutPlanUseCase,
    private readonly getActiveWorkoutPlanUseCase: GetActiveWorkoutPlanUseCase,
  ) {}

  @RequireWorkoutPreference()
  @ApiCreatedResponse({ type: ActiveWorkoutPlanDto })
  @UseInterceptors(WorkoutPreferenceInterceptor)
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  createWorkoutPlan(@Body() body: CreateWorkoutPlanRequestDto) {
    return this.createWorkoutPlanUseCase.execute(body)
  }

  @ApiOkResponse({ type: ActiveWorkoutPlanDto })
  @Get('active')
  getActiveWorkoutPlan() {
    return this.getActiveWorkoutPlanUseCase.execute()
  }
}
