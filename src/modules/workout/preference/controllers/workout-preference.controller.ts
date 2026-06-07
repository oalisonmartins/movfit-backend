import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { WorkoutPreferenceDto } from 'src/modules/workout/preference/dtos/workout-preference.dto'
import { GetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/get-workout-preference.use-case'

@UseGuards(JwtAuthGuard)
@Controller('workout/preference')
export class WorkoutPreferenceController {
  constructor(private readonly getWorkoutPreferenceUseCase: GetWorkoutPreferenceUseCase) {}

  @UseGuards(OnboardingGuard)
  @ApiOkResponse({ type: WorkoutPreferenceDto })
  @Throttle({ heavy: { ttl: 60000, limit: 10 } })
  @Get()
  getWorkoutPreference() {
    return this.getWorkoutPreferenceUseCase.execute()
  }
}
