import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'

@Injectable()
export abstract class DietsRepository {
  abstract getAll(userId: string): Promise<Diet[]>
  abstract getActive(userId: string): Promise<Diet | null>
}
