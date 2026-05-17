import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { InterceptorException } from 'src/common/exceptions/interceptor.exception'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyWaterConsumptionRepository } from 'src/modules/daily-water-consumption/repositories/daily-water-consumption.repository'

@Injectable()
export class DailyWaterConsumptionInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly dailyWaterConsumptionRepository: DailyWaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireDailyWaterconsumption = this.reflector.get(
      constants.REQUIRE_DAILY_WATER_CONSUMPTION_KEY,
      context.getHandler(),
    )

    if (requireDailyWaterconsumption) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const dailyWaterConsumption = await this.dailyWaterConsumptionRepository.findOne(user.id)

      if (!dailyWaterConsumption) {
        throw new InterceptorException(
          {
            message: 'Você precisa ter uma meta diária de água definida para continuar.',
            code: 'DAILY_WATER_CONSUMPTION_IS_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setDailyWaterConsumption = dailyWaterConsumption

      return next.handle()
    }

    return next.handle()
  }
}
