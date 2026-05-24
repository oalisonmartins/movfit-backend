import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'

@Injectable()
export class ActiveDietInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly dietsRepository: DietsRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireActiveDiet = this.reflector.get(constants.REQUIRE_ACTIVE_DIET_KEY, context.getHandler())

    if (requireActiveDiet) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const [activeDiet] = await this.dietsRepository.findMany(user.id, true)

      if (!activeDiet) {
        throw new HttpException(
          {
            message: 'Você precisa ter uma dieta ativa para continuar.',
            code: 'ACTIVE_DIET_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setActiveDiet = activeDiet
    }

    return next.handle()
  }
}
