import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { SetWorkoutPreferenceDto } from 'src/modules/workout/preference/dtos/set-workout-preference.dto'
import { WorkoutPreferenceDto } from 'src/modules/workout/preference/dtos/workout-preference.dto'
import { GetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/get-workout-preference.use-case'
import { SetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/set-workout-preference.use-case'

@UseGuards(JwtAuthGuard)
@Controller('workout/preference')
export class WorkoutPreferenceController {
  constructor(
    private readonly getWorkoutPreferenceUseCase: GetWorkoutPreferenceUseCase,
    private readonly SetWorkoutPreferenceUseCase: SetWorkoutPreferenceUseCase,
  ) {}

  @UseGuards(OnboardingGuard)
  @ApiOkResponse({ type: WorkoutPreferenceDto })
  @Throttle({ heavy: { ttl: 60000, limit: 10 } })
  @Get()
  getWorkoutPreference() {
    return this.getWorkoutPreferenceUseCase.execute()
  }

  @ApiCreatedResponse({ type: WorkoutPreferenceDto })
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  SetWorkoutPreference(@Body() body: SetWorkoutPreferenceDto) {
    return this.SetWorkoutPreferenceUseCase.execute(body)
  }
}
