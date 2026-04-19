import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileModule } from '../profile/profile.module'
import { WorkoutConfigModule } from '../workout-config/workout-config.module'
import { UsersController } from './controller/users.controller'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { UsersRepository } from './repositories/users-repository'
import { GetMeUseCase } from './use-cases/get-me.use-case'

@Module({
  imports: [WorkoutConfigModule, ProfileModule],
  exports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    GetMeUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
