import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutConfig } from 'src/common/decorators/require-workout-config.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutConfigInterceptor } from 'src/common/interceptors/workout-config.interceptor'
import { MeResponseDTO } from '../dtos/me.dto'
import { MeUseCase } from '../use-cases/me.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/users', version: '1' })
export class UsersController {
  constructor(private readonly meUseCase: MeUseCase) {}

  @RequireProfile()
  @RequireWorkoutConfig()
  @UseInterceptors(ProfileInterceptor, WorkoutConfigInterceptor)
  @ApiOkResponse({ type: MeResponseDTO })
  @Get('/me')
  me() {
    return this.meUseCase.execute()
  }
}
