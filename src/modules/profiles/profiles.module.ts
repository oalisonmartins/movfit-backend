import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaProfileRepository } from 'src/infra/database/repositories/profiles/profiles.repository'
import { ProfilesController } from 'src/modules/profiles/controller/profiles.controller'
import { ProfileRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { CompleteProfileUseCase } from 'src/modules/profiles/use-cases/complete-profile.use-case'

@Module({
  controllers: [ProfilesController],
  exports: [ProfileRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    CompleteProfileUseCase,
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
  ],
})
export class ProfilesModule {}
