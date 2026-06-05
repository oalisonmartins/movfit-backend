import { Module } from '@nestjs/common'
import { WorkoutPlanModule } from 'src/modules/workout/plan/plan.module'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/preference.module'

@Module({
  imports: [WorkoutPreferenceModule, WorkoutPlanModule],
})
export class WorkoutModule {}
