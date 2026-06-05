import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { CreateWorkoutPlanInputDto } from 'src/modules/workout/plan/dtos/create-plan.dto'
import { CreateWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/create-plan.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('workout/plan')
export class WorkoutPlanController {
  constructor(private readonly createWorkoutPlanUseCase: CreateWorkoutPlanUseCase) {}

  @RequireWorkoutConfig()
  @UseInterceptors(WorkoutConfigInterceptor)
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  createWorkoutPlan(@Body() body: CreateWorkoutPlanInputDto) {
    return this.createWorkoutPlanUseCase.execute(body)
  }
}
