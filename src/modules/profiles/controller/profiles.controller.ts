import { Body, Controller, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileDto } from 'src/modules/profiles/dtos/profile.dto'
import { UpdateProfileDto } from 'src/modules/profiles/dtos/update-profile.dto'
import { UpdateProfileUseCase } from 'src/modules/profiles/use-cases/update-profile.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly updateProfileUseCase: UpdateProfileUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProfileDto })
  @Patch()
  updateProfile(@Body() body: UpdateProfileDto) {
    return this.updateProfileUseCase.execute(body)
  }
}
