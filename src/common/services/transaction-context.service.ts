import { AsyncLocalStorage } from 'node:async_hooks'
import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'

@Injectable()
export class TransactionContextService {
  private storage = new AsyncLocalStorage<Prisma.TransactionClient>()

  run<T>(tx: Prisma.TransactionClient, callback: () => Promise<T>) {
    return this.storage.run(tx, callback)
  }

  set(tx: Prisma.TransactionClient) {
    this.storage.enterWith(tx)
  }

  get(): Prisma.TransactionClient | null {
    return this.storage.getStore() ?? null
  }

  clear() {
    this.storage.disable()
  }
}
