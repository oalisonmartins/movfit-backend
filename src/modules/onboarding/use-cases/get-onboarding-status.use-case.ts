import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/workout-preference.repository'

@Injectable()
export class GetOnboardingStatusUseCase {
  constructor(
    private readonly requestContext: RequestContextService,
    private readonly profilesRepository: ProfilesRepository,
    private readonly dietsPreferenceRepository: DietsPreferenceRepository,
    private readonly workoutPreferenceRepository: WorkoutPreferenceRepository,
  ) {}

  async execute() {
    const { id, hasCompletedOnboarding } = this.requestContext.getUser

    if (hasCompletedOnboarding) {
      return {
        stepsCount: 3,
        completedSteps: 3,
        remainingSteps: 0,
      }
    }

    const steps = await Promise.all([
      this.profilesRepository.findOne(id),
      this.dietsPreferenceRepository.findOne(id),
      this.workoutPreferenceRepository.findOne(id),
    ])

    const stepsCount = steps.length
    let completedSteps = 0

    steps.forEach((step) => {
      if (step !== null) completedSteps++
    })

    return {
      stepsCount,
      completedSteps,
      remainingSteps: stepsCount - completedSteps,
    }
  }
}
