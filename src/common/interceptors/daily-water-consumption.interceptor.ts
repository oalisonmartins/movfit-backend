import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { DailyWaterConsumptionRepository } from 'src/modules/daily-water-consumption/repositories/daily-water-consumption.repository'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class DailyWaterConsumptionInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly dailyWaterConsumptionRepo: DailyWaterConsumptionRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireDailyWaterconsumption = this.reflector.get(
      'REQUIRE_DAILY_WATER_CONSUMPTION',
      context.getHandler(),
    )

    if (requireDailyWaterconsumption) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const dailyWaterConsumption = await this.dailyWaterConsumptionRepo.get(user.id)

      if (!dailyWaterConsumption) {
        throw new InternalServerErrorException(
          'Daily water consumption inconsistency: expected daily water consumption but not found.',
        )
      }

      this.requestContext.setDailyWaterConsumption = dailyWaterConsumption

      return next.handle()
    }

    return next.handle()
  }
}
