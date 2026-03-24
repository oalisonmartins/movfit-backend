import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { RegisterWorkoutConfigDto } from '../dtos/register-workout-config.dto'
import { WorkoutConfigRepository } from '../repositories/workout-config.repository'

@Injectable()
export class RegisterWorkoutConfigUseCase {
  constructor(
    private readonly workoutConfigRepository: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(dto: RegisterWorkoutConfigDto) {
    const userId = this.requestContext.getUserId

    return this.workoutConfigRepository.registerWorkoutConfig({
      userId,
      freeDaysPerWeek: dto.freeDaysPerWeek,
      freeTimeByDayInSeconds: dto.freeTimeByDayInSeconds,
      focusMuscles: dto.focusMuscles,
    })
  }
}
