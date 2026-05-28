import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'

@Injectable()
export class GetHydrationProgressUseCase {
  constructor(
    private readonly hydrationLogRepository: HydrationLogRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute() {
    const userId = this.requestContext.getUserId

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const todayHydrationLog = await this.hydrationLogRepository.findOne(userId, today)

    if (!todayHydrationLog) {
      throw new HttpException(
        {
          message: 'Nenhum registro de hidratação encontrado hoje',
          code: 'HYDRATION_LOG_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return {
      date: todayHydrationLog.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      dailyGoalInMl: todayHydrationLog.dailyGoalInMl,
      totalConsumedInMl: todayHydrationLog.totalConsumedInMl,
      totalRemainingInMl: Math.max(0, todayHydrationLog.dailyGoalInMl - todayHydrationLog.totalConsumedInMl),
      totalConsumedPercent: Number((todayHydrationLog.totalConsumedInMl / todayHydrationLog.dailyGoalInMl).toFixed(2)),
    }
  }
}
