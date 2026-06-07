import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { RequireDietPreference } from 'src/common/decorators/require-diet-preference.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { DietPreferenceInterceptor } from 'src/common/interceptors/diet-preference.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import { SetDietPreferenceDto } from 'src/modules/onboarding/dtos/set-diets-preference.dto'
import { SetPersonalInfosDto } from 'src/modules/onboarding/dtos/set-personal-infos.dto'
import { SetWorkoutPreferenceDto } from 'src/modules/onboarding/dtos/set-workout-preference.dto'
import { CompleteOnboardingUseCase } from 'src/modules/onboarding/use-cases/complete-onboarding.use-case'
import { GetOnboardingStatusUseCase } from 'src/modules/onboarding/use-cases/get-onboarding-status.use-case'
import { SetDietsPreferenceUseCase } from 'src/modules/onboarding/use-cases/set-diets-preference.use-case'
import { SetPersonalInfosUseCase } from 'src/modules/onboarding/use-cases/set-personal-infos.use-case'
import { SetWorkoutPreferenceUseCase } from 'src/modules/onboarding/use-cases/set-workout-preference.use-case'
import { ProfileDto } from 'src/modules/profiles/dtos/profile.dto'
import { WorkoutPreferenceDto } from 'src/modules/workout/preference/dtos/workout-preference.dto'

@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
    private readonly setPersonalInfosUseCase: SetPersonalInfosUseCase,
    private readonly setDietPreferenceUseCase: SetDietsPreferenceUseCase,
    private readonly setWorkoutPreferenceUseCase: SetWorkoutPreferenceUseCase,
  ) {}

  @Get('status')
  getOnboardingStatus() {
    return this.getOnboardingStatusUseCase.execute()
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: ProfileDto })
  @Post('personal-infos')
  setPersonalInfos(@Body() body: SetPersonalInfosDto) {
    return this.setPersonalInfosUseCase.execute(body)
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  @Post('diets-preference')
  setDietPreference(@Body() body: SetDietPreferenceDto) {
    return this.setDietPreferenceUseCase.execute(body)
  }

  @ApiCreatedResponse({ type: WorkoutPreferenceDto })
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post('workout-preference')
  setWorkoutPreference(@Body() body: SetWorkoutPreferenceDto) {
    return this.setWorkoutPreferenceUseCase.execute(body)
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
