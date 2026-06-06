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
import { DietPreferenceRepository } from 'src/modules/diets/preference/repositories/preference.repository'

@Injectable()
export class DietPreferenceInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly dietPreferenceRepository: DietPreferenceRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireDietPreference = this.reflector.get(
      constants.REQUIRE_DIET_PREFERENCE_KEY,
      context.getHandler(),
    )

    if (requireDietPreference) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const dietPreference = await this.dietPreferenceRepository.findOne(user.id)

      if (!dietPreference) {
        throw new HttpException(
          {
            message: 'Defina as preferência de dieta para continuar',
            code: 'DIET_PREFERENCE_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setDietPreference = dietPreference
    }

    return next.handle()
  }
}
