import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigOutput } from 'src/modules/workout/config/types/config.types'
import { WorkoutConfigRepository } from '../repositories/config.repository'

@Injectable()
export class GetWorkoutConfigUseCase {
  constructor(
    private readonly workoutConfigRepository: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(): Promise<WorkoutConfigOutput> {
    const userId = this.requestContext.getUserId
    const workoutConfig = await this.workoutConfigRepository.findOne(userId)

    if (!workoutConfig) {
      throw new HttpException(
        {
          message: 'Nenhuma configuração de treino foi encontrada',
          code: 'WORKOUT_CONFIG_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return {
      id: workoutConfig.id,
      focusMuscles: workoutConfig.focusMuscles,
      freeDaysPerWeek: workoutConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: workoutConfig.freeTimeByDayInSeconds,
      createdAt: workoutConfig.createdAt.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }
  }
}
