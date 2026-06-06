import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaProfilesRepository } from 'src/infra/database/prisma/repositories/profiles/prisma-profiles.repository'
import { ProfilesController } from 'src/modules/profiles/controller/profiles.controller'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'
import { SetPersonalInfosUseCase } from 'src/modules/profiles/use-cases/set-personal-infos.use-case'
import { UpdatePersonalInfosUseCase } from 'src/modules/profiles/use-cases/update-personal-infos.use-case'

@Module({
  controllers: [ProfilesController],
  exports: [ProfilesRepository],
  providers: [
    SetPersonalInfosUseCase,
    UpdatePersonalInfosUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: ProfilesRepository,
      useClass: PrismaProfilesRepository,
    },
  ],
})
export class ProfilesModule {}
