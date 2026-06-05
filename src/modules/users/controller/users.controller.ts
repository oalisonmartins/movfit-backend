import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import { MeResponseDTO } from 'src/modules/users/dtos'
import { MeUseCase } from 'src/modules/users/use-cases/me.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/users', version: '1' })
export class UsersController {
  constructor(private readonly meUseCase: MeUseCase) {}

  @RequireProfile()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, WorkoutPreferenceInterceptor)
  @ApiOkResponse({ type: MeResponseDTO })
  @Get('/me')
  me() {
    return this.meUseCase.execute()
  }
}
