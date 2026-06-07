import { Body, Controller, Patch, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { UpdateDietsPreferenceDto } from 'src/modules/diets/preference/dtos/update-diets-preference.dto'
import { UpdateDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-diets-preference.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('diets/preference')
export class DietsPreferenceControler {
  constructor(private readonly updateDietsPreferenceUseCase: UpdateDietsPreferenceUseCase) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Patch()
  updateDietsPreference(@Body() body: UpdateDietsPreferenceDto) {
    return this.updateDietsPreferenceUseCase.execute(body)
  }
}
