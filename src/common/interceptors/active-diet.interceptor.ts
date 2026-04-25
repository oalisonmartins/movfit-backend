import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class ActiveDietInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly dietsRepo: DietsRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireActiveDiet = this.reflector.get(constants.REQUIRE_ACTIVE_DIET_KEY, context.getHandler())

    if (requireActiveDiet) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const activeDiet = await this.dietsRepo.getActive(user.id)

      if (!activeDiet) throw new InternalServerErrorException('Interception error: ActiveDiet not found.')

      this.requestContext.setActiveDiet = activeDiet
      return next.handle()
    }

    return next.handle()
  }
}
