import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { SetDietPreferenceDto } from 'src/modules/diets/preference/dtos/set-preference.dto'
import { UpdateDietPreferenceDto } from 'src/modules/diets/preference/dtos/update-preference.dto'
import { SetDietPreferenceUseCase } from 'src/modules/diets/preference/use-cases/set-preference.use-case'
import { UpdateDietPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-preference.use-case'

@UseGuards(JwtAuthGuard)
@Controller('diets/preference')
export class DietPreferenceControler {
  constructor(
    private readonly setDietPreferenceUseCase: SetDietPreferenceUseCase,
    private readonly updateDietPreferenceUseCase: UpdateDietPreferenceUseCase,
  ) {}

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Post()
  setDietPreference(@Body() body: SetDietPreferenceDto) {
    return this.setDietPreferenceUseCase.execute(body)
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Patch()
  updateDietPreference(@Body() body: UpdateDietPreferenceDto) {
    return this.updateDietPreferenceUseCase.execute(body)
  }
}
