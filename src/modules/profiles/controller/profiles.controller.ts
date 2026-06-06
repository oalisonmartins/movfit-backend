import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ProfileDto } from 'src/modules/profiles/dtos/profile.dto'
import { SetPersonalInfosDto } from 'src/modules/profiles/dtos/set-personal-infos.dto'
import { UpdatePersonalInfosDto } from 'src/modules/profiles/dtos/update-personal-infos.dto'
import { SetPersonalInfosUseCase } from 'src/modules/profiles/use-cases/set-personal-infos.use-case'
import { UpdatePersonalInfosUseCase } from 'src/modules/profiles/use-cases/update-personal-infos.use-case'

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
  constructor(
    private readonly setPersonalInfosUseCase: SetPersonalInfosUseCase,
    private readonly updatePersonalInfosUseCase: UpdatePersonalInfosUseCase,
  ) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProfileDto })
  @Post()
  setPersonalInfos(@Body() body: SetPersonalInfosDto) {
    return this.setPersonalInfosUseCase.execute(body)
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProfileDto })
  @Patch()
  updatePersonalInfos(@Body() body: UpdatePersonalInfosDto) {
    return this.updatePersonalInfosUseCase.execute(body)
  }
}
