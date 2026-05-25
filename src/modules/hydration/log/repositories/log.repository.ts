import { Injectable } from '@nestjs/common'
import { HydrationLog } from 'generated/prisma/client'
import { HydrationLogWithEntries } from 'src/modules/hydration/log/types/log-with-entries.types'

@Injectable()
export abstract class HydrationLogRepository {
  abstract create(userId: string, input: { dailyGoalInMl: number; date: Date }): Promise<HydrationLog>
  abstract findOne(userId: string, date?: Date): Promise<HydrationLogWithEntries | null>
  abstract findMany(userId: string, from: Date, to: Date): Promise<HydrationLogWithEntries[] | null>
}
