import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { UserUpdateInput } from 'generated/prisma/models'
import { BaseRepository } from 'src//infra/database/prisma/repositories/base.repository'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { CreateUserInput } from 'src/modules/users/types/create-user.type'

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

  async update(userId: string, input: UserUpdateInput): Promise<User> {
    return await this.db.user.update({
      where: { id: userId },
      data: input,
    })
  }
}
