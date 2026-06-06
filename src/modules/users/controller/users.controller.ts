import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
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
import { CompleteOnboardingUseCase } from 'src/modules/users/use-cases/complete-onboarding.use-case'
import { MeUseCase } from 'src/modules/users/use-cases/me.use-case'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly meUseCase: MeUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
  ) {}

  @UseGuards(OnboardingGuard)
  @RequireProfile()
  @RequireDietPreference()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, DietPreferenceInterceptor, WorkoutPreferenceInterceptor)
  @ApiOkResponse({ type: MeResponseDTO })
  @Get('me')
  me() {
    return this.meUseCase.execute()
  }

  @RequireProfile()
  @RequireDietPreference()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, DietPreferenceInterceptor, WorkoutPreferenceInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('onboarding')
  completeOnboarding() {
    return this.completeOnboardingUseCase.execute()
  }
}
