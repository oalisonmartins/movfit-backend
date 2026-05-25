import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { IntakeWaterDto } from 'src/modules/hydration/entry/dtos/intake-water.dto'
import { IntakeWaterUseCase } from 'src/modules/hydration/entry/use-cases/intake-water.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('hydration/entry')
export class HydrationEntryController {
  constructor(private readonly intakeWaterUseCase: IntakeWaterUseCase) {}

  @Post()
  intakeWater(@Body() body: IntakeWaterDto) {
    return this.intakeWaterUseCase.execute(body.amountInMl)
  }
}
