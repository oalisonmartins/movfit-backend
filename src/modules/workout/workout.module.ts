import { Module } from '@nestjs/common'
import { WorkoutConfigModule } from 'src/modules/workout/config/config.module'

@Module({
  imports: [WorkoutConfigModule],
})
export class WorkoutModule {}
