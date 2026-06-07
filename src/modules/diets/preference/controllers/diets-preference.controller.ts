import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { DietsPreferenceDto } from 'src/modules/diets/preference/dtos/diets-preference.dto'
import { UpdateDietsPreferenceDto } from 'src/modules/diets/preference/dtos/update-diets-preference.dto'
import { GetDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/get-diets-preference.use-case'
import { UpdateDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-diets-preference.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('diets/preference')
export class DietsPreferenceControler {
  constructor(
    private readonly updateDietsPreferenceUseCase: UpdateDietsPreferenceUseCase,
    private readonly getDietsPreferenceUseCase: GetDietsPreferenceUseCase,
  ) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Patch()
  updateDietsPreference(@Body() body: UpdateDietsPreferenceDto) {
    return this.updateDietsPreferenceUseCase.execute(body)
  }

  @ApiOkResponse({ type: DietsPreferenceDto })
  @Get()
  getDietsPreference() {
    return this.getDietsPreferenceUseCase.execute()
  }
}
