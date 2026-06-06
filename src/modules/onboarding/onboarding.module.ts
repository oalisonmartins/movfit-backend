import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceModule } from 'src/modules/diets/preference/diets-preference.module'
import { OnboardingController } from 'src/modules/onboarding/controllers/onboarding.controller'
import { CompleteOnboardingUseCase } from 'src/modules/onboarding/use-cases/complete-onboarding.use-case'
import { GetOnboardingStatusUseCase } from 'src/modules/onboarding/use-cases/get-onboarding-status.use-case'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { UsersModule } from 'src/modules/users/users.module'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/workout-preference.module'

@Module({
  imports: [UsersModule, ProfilesModule, DietsPreferenceModule, WorkoutPreferenceModule],
  controllers: [OnboardingController],
  providers: [GetOnboardingStatusUseCase, CompleteOnboardingUseCase, RequestContextService],
})
export class OnboardingModule {}
