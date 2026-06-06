import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { RequireDietPreference } from 'src/common/decorators/require-diet-preference.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { DietPreferenceInterceptor } from 'src/common/interceptors/diet-preference.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import { CompleteOnboardingUseCase } from 'src/modules/onboarding/use-cases/complete-onboarding.use-case'
import { GetOnboardingStatusUseCase } from 'src/modules/onboarding/use-cases/get-onboarding-status.use-case'

@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
  ) {}

  @Get('status')
  getOnboardingStatus() {
    return this.getOnboardingStatusUseCase.execute()
  }

  @RequireProfile()
  @RequireDietPreference()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, DietPreferenceInterceptor, WorkoutPreferenceInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  completeOnboarding() {
    return this.completeOnboardingUseCase.execute()
  }
}
