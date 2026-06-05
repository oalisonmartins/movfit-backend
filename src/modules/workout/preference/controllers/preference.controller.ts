import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { CreateWorkoutPreferenceRequestDto } from 'src/modules/workout/preference/dtos/create-preference.dto'
import { WorkoutPreferenceResponseDto } from 'src/modules/workout/preference/dtos/preference.dto'
import { CreateWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/create-preference.use-case'
import { GetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/get-preference.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('workout/preference')
export class WorkoutPreferenceController {
  constructor(
    private readonly getWorkoutPreferenceUseCase: GetWorkoutPreferenceUseCase,
    private readonly createWorkoutPreferenceUseCase: CreateWorkoutPreferenceUseCase,
  ) {}

  @ApiOkResponse({ type: WorkoutPreferenceResponseDto })
  @Throttle({ heavy: { ttl: 60000, limit: 10 } })
  @Get()
  getWorkoutPreference() {
    return this.getWorkoutPreferenceUseCase.execute()
  }

  @ApiCreatedResponse({ type: WorkoutPreferenceResponseDto })
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  createWorkoutPreference(@Body() body: CreateWorkoutPreferenceRequestDto) {
    return this.createWorkoutPreferenceUseCase.execute(body)
  }
}
