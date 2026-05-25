import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'

@Injectable()
export class GetHydrationHistoryUseCase {
  constructor(
    private readonly hydrationLogRepository: HydrationLogRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(from: Date, to: Date) {
    const userId = this.requestContext.getUserId
    const { timezone } = this.requestContext.getProfile

    const hydrationLogs = await this.hydrationLogRepository.findMany(userId, from, to)

    if (!hydrationLogs?.length) return []

    return hydrationLogs.map((hydrationLog) => ({
      id: hydrationLog.id,
      date: hydrationLog.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      dailyGoalInMl: hydrationLog.dailyGoalInMl,
      totalConsumedInMl: hydrationLog.totalConsumedInMl,
      entries: hydrationLog.hydrationEntries.map((hydrationEntry) => ({
        id: hydrationEntry.id,
        amountInMl: hydrationEntry.amountInMl,
        time: hydrationEntry.createdAt.toLocaleTimeString('pt-BR', { timeZone: timezone }),
      })),
    }))
  }
}
