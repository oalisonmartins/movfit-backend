import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { WorkoutConfigResponseDto } from 'src/modules/workout/config/dtos/config.dto'
import { CreateWorkoutConfigRequestDto } from 'src/modules/workout/config/dtos/create-config.dto'
import { CreateWorkoutConfigUseCase } from 'src/modules/workout/config/use-cases/create-config.use-case'
import { GetWorkoutConfigUseCase } from 'src/modules/workout/config/use-cases/get-config.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('workout/config')
export class WorkoutConfigController {
  constructor(
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
    private readonly createWorkoutConfigUseCase: CreateWorkoutConfigUseCase,
  ) {}

  @ApiOkResponse({ type: WorkoutConfigResponseDto })
  @Throttle({ heavy: { ttl: 60000, limit: 10 } })
  @Get()
  getWorkoutConfig() {
    return this.getWorkoutConfigUseCase.execute()
  }

  @ApiCreatedResponse({ type: WorkoutConfigResponseDto })
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  createWorkoutConfig(@Body() body: CreateWorkoutConfigRequestDto) {
    return this.createWorkoutConfigUseCase.execute(body)
  }
}
