import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigOutput } from 'src/modules/workout/config/types/config.types'
import { CreateWorkoutConfigInput } from 'src/modules/workout/config/types/create-config.types'
import { WorkoutConfigRepository } from '../repositories/config.repository'

@Injectable()
export class CreateWorkoutConfigUseCase {
  constructor(
    private readonly workoutConfigRepository: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: CreateWorkoutConfigInput): Promise<WorkoutConfigOutput> {
    const userId = this.requestContext.getUserId

    const workoutConfig = await this.workoutConfigRepository.findOne(userId)

    if (workoutConfig) {
      throw new HttpException(
        {
          message: 'Você já tem uma configuração de treino definida',
          code: 'WORKOUT_CONFIG_ALREADY_EXIST',
        },
        HttpStatus.CONFLICT,
      )
    }

    const createdConfig = await this.workoutConfigRepository.create(userId, input)

    return {
      id: createdConfig.id,
      focusMuscles: createdConfig.focusMuscles,
      freeDaysPerWeek: createdConfig.freeDaysPerWeek,
      freeTimeByDayInSeconds: createdConfig.freeTimeByDayInSeconds,
      createdAt: createdConfig.createdAt.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }
  }
}
