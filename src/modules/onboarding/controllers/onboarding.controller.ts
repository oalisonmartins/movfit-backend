import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { GetOnboardingStatusUseCase } from 'src/modules/onboarding/use-cases/get-onboarding-status.use-case'

@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase) {}

  @Get('status')
  getOnboardingStatus() {
    return this.getOnboardingStatusUseCase.execute()
  }
}
