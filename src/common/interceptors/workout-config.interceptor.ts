import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutConfigRepository } from 'src/modules/workout/config/repositories/config.repository'

@Injectable()
export class WorkoutConfigInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly workoutConfigRepository: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireWorkoutConfig = this.reflector.get(constants.REQUIRE_WORKOUT_CONFIG_KEY, context.getHandler())

    if (requireWorkoutConfig) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const workoutConfig = await this.workoutConfigRepository.findOne(user.id)

      if (!workoutConfig) {
        throw new HttpException(
          {
            message: 'Defina uma configuração de treino para continuar',
            code: 'WORKOUT_CONFIG_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setWorkoutConfig = workoutConfig
    }

    return next.handle()
  }
}
