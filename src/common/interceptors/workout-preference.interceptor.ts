import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { RequestContextService } from 'src/common/services/request-context.service'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/workout-preference.repository'

@Injectable()
export class WorkoutPreferenceInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly workoutPreferenceRepository: WorkoutPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireWorkoutPreference = this.reflector.get(
      constants.REQUIRE_WORKOUT_PREFERENCE_KEY,
      context.getHandler(),
    )

    if (requireWorkoutPreference) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const workoutPreference = await this.workoutPreferenceRepository.findOne(user.id)

      if (!workoutPreference) {
        throw new HttpException(
          {
            message: 'Defina uma preferência de treino para continuar',
            code: 'WORKOUT_PREFERENCE_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setWorkoutPreference = workoutPreference
    }

    return next.handle()
  }
}
