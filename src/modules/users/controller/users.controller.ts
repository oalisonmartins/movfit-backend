import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { RequireDietPreference } from 'src/common/decorators/require-diet-preference.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { DietPreferenceInterceptor } from 'src/common/interceptors/diet-preference.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import { MeResponseDTO } from 'src/modules/users/dtos/me.dto'
import { MeUseCase } from 'src/modules/users/use-cases/me.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly meUseCase: MeUseCase) {}

  @RequireProfile()
  @RequireDietPreference()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, DietPreferenceInterceptor, WorkoutPreferenceInterceptor)
  @ApiOkResponse({ type: MeResponseDTO })
  @Get('me')
  me() {
    return this.meUseCase.execute()
  }
}
