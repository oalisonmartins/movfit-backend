import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { HydrationEntryRepository } from 'src/modules/hydration/entry/repositories/entry.repository'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'

@Injectable()
export class IntakeWaterUseCase {
  constructor(
    private readonly hydrationEntryRepository: HydrationEntryRepository,
    private readonly hydrationLogRepository: HydrationLogRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(amountInMl: number) {
    const userId = this.requestContext.getUserId

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const hydrationLog = await this.hydrationLogRepository.findOne(userId, today)

    if (!hydrationLog) {
      throw new HttpException(
        {
          message: 'Nenhum registro de hidratação encontrado hoje',
          code: 'HYDRATION_LOG_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    const hydrationEntry = await this.hydrationEntryRepository.create(userId, {
      hydrationLogId: hydrationLog.id,
      amountInMl,
    })

    return {
      id: hydrationEntry.id,
      amountInMl: hydrationEntry.amountInMl,
      date: hydrationLog.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    }
  }
}
