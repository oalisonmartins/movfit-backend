import { Injectable } from '@nestjs/common'
import { HydrationEntry } from 'generated/prisma/client'

@Injectable()
export abstract class HydrationEntryRepository {
  abstract create(userId: string, input: { amountInMl: number; hydrationLogId: string }): Promise<HydrationEntry>
  abstract findMany()
}
