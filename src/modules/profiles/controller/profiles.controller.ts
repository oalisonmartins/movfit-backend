import { Body, Controller, Patch, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ProfileDto } from 'src/modules/profiles/dtos/profile.dto'
import { SetPersonalInfosDto } from 'src/modules/profiles/dtos/set-personal-infos.dto'
import { SetPersonalInfosUseCase } from 'src/modules/profiles/use-cases/set-personal-infos.use-case'

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly setPersonalInfosUseCase: SetPersonalInfosUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: ProfileDto })
  @Patch()
  setPersonalInfos(@Body() body: SetPersonalInfosDto) {
    return this.setPersonalInfosUseCase.execute(body)
  }
}
