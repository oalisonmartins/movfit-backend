import { Body, Controller, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiNoContentResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CompleteProfileDto } from '../dtos/complete-profile.dto'
import { CompleteProfileUseCase } from '../use-cases/complete-profile.use-case'

@UseGuards(JwtAuthGuard)
@Controller({ path: '/profile', version: '1' })
export class ProfileController {
  constructor(private readonly completeProfileUseCase: CompleteProfileUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  completeOnboarding(@Body() dto: CompleteProfileDto) {
    return this.completeProfileUseCase.execute(dto)
  }
}
