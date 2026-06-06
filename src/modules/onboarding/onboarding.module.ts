import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceModule } from 'src/modules/diets/preference/diets-preference.module'
import { OnboardingController } from 'src/modules/onboarding/controllers/onboarding.controller'
import { GetOnboardingStatusUseCase } from 'src/modules/onboarding/use-cases/get-onboarding-status.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/workout-preference.module'

@Module({
  imports: [ProfilesModule, DietsPreferenceModule, WorkoutPreferenceModule],
  controllers: [OnboardingController],
  providers: [GetOnboardingStatusUseCase, RequestContextService],
})
export class OnboardingModule {}
