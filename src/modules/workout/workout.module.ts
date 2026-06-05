import { Module } from '@nestjs/common'
import { WorkoutConfigModule } from 'src/modules/workout/config/config.module'
import { WorkoutPlanModule } from 'src/modules/workout/plan/plan.module'

@Module({
  imports: [WorkoutConfigModule, WorkoutPlanModule],
})
export class WorkoutModule {}
