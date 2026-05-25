import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'

@Injectable()
export class GetHydrationLogUseCase {
  constructor(
    private readonly hydrationLogRepository: HydrationLogRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(date?: Date) {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile

    let queryDate: Date

    if (!date) {
      const today = new Date()
      today.setUTCHours(0, 0, 0, 0)

      queryDate = today
    } else {
      queryDate = date
    }

    const hydrationLog = await this.hydrationLogRepository.findOne(userId, queryDate)

    if (!hydrationLog) {
      throw new HttpException(
        {
          message: 'Nenhum registro de hidratação encontrado para esse dia',
          code: 'HYDRATION_LOG_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return {
      id: hydrationLog.id,
      date: hydrationLog.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      dailyGoalInMl: hydrationLog.dailyGoalInMl,
      totalConsumedInMl: hydrationLog.totalConsumedInMl,
      entries: hydrationLog.hydrationEntries.map((entry) => ({
        id: entry.id,
        amountInMl: entry.amountInMl,
        time: entry.createdAt.toLocaleTimeString('pt-BR', { timeZone: timezone }),
      })),
    }
  }
}
