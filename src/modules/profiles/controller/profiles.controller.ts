import { Body, Controller, Patch, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import {
  CompleteProfileRequestDTO,
  CompleteProfileResponseDTO,
} from 'src/modules/profiles/dtos/complete-profile.dto'
import { CompleteProfileUseCase } from 'src/modules/profiles/use-cases/complete-profile.use-case'

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly completeProfileUseCase: CompleteProfileUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: CompleteProfileResponseDTO })
  @Patch()
  completeProfile(@Body() body: CompleteProfileRequestDTO) {
    return this.completeProfileUseCase.execute(body)
  }
}
