import { Module } from '@nestjs/common'
import { WorkoutPlanModule } from 'src/modules/workout/plan/workout-plan.module'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/workout-preference.module'

@Module({
  imports: [WorkoutPreferenceModule, WorkoutPlanModule],
})
export class WorkoutModule {}
