import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { BaseRepository } from 'src/infra/database/repositories/base.repository'
import { UsersRepository } from '../../../../modules/users/repositories/users-repository'
import { CreateUserInput } from '../../../../modules/users/types/create-user.type'

@Injectable()
export class PrismaUsersRepository extends BaseRepository implements UsersRepository {
  constructor(
    readonly prisma: PrismaService,
    readonly transactionContext: TransactionContextService,
  ) {
    super(prisma, transactionContext)
  }

  async create(input: CreateUserInput): Promise<User> {
    return await this.db.user.create({
      data: { name: input.name, email: input.email, passwordHash: input.password },
    })
  }

  async findOneById(userId: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { id: userId },
    })
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { email },
    })
  }
}
