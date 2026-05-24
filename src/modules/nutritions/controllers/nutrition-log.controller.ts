import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { RequireActiveDiet } from 'src/common/decorators/require-active-diet.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ActiveDietInterceptor } from 'src/common/interceptors/active-diet.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { GetNutritionProgressDto } from 'src/modules/nutritions/dtos/get-nutrition-progress.dto'
import { GetNutritionProgressUseCase } from 'src/modules/nutritions/use-cases/get-nutrition-progress.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('nutrition-log')
export class NutritionLogController {
  constructor(private readonly getNutritionProgressUseCase: GetNutritionProgressUseCase) {}

  @RequireActiveDiet()
  @RequireProfile()
  @UseInterceptors(ProfileInterceptor, ActiveDietInterceptor)
  @Get('progress')
  getNutritionProgress(@Query() query: GetNutritionProgressDto) {
    return this.getNutritionProgressUseCase.execute(query)
  }
}
