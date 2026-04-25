import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { WorkoutConfigRepository } from 'src/modules/workout-config/repositories/workout-config.repository'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class WorkoutConfigInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly workoutConfigRepo: WorkoutConfigRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireWorkoutConfig = this.reflector.get(constants.REQUIRE_WORKOUT_CONFIG_KEY, context.getHandler())

    if (requireWorkoutConfig) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const workoutConfig = await this.workoutConfigRepo.get(user.id)

      if (!workoutConfig) throw new InternalServerErrorException('Interception error: WorkoutConfig not found.')

      this.requestContext.setWorkoutConfig = workoutConfig

      return next.handle()
    }

    return next.handle()
  }
}
