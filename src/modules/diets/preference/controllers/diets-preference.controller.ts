import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { SetDietPreferenceDto } from 'src/modules/diets/preference/dtos/set-diets-preference.dto'
import { UpdateDietsPreferenceDto } from 'src/modules/diets/preference/dtos/update-diets-preference.dto'
import { SetDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/set-diets-preference.use-case'
import { UpdateDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-diets-preference.use-case'

@UseGuards(JwtAuthGuard)
@Controller('diets/preference')
export class DietsPreferenceControler {
  constructor(
    private readonly setDietsPreferenceUseCase: SetDietsPreferenceUseCase,
    private readonly updateDietsPreferenceUseCase: UpdateDietsPreferenceUseCase,
  ) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  setDietPreference(@Body() body: SetDietPreferenceDto) {
    return this.setDietsPreferenceUseCase.execute(body)
  }

  @UseGuards(OnboardingGuard)
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Patch()
  UpdateDietsPreference(@Body() body: UpdateDietsPreferenceDto) {
    return this.updateDietsPreferenceUseCase.execute(body)
  }
}
