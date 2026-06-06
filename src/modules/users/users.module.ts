import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaUsersRepository } from 'src/infra/database/repositories/users/users.repository'
import { DietsPreferenceModule } from 'src/modules/diets/preference/diets-preference.module'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { UsersController } from 'src/modules/users/controller/users.controller'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'
import { CompleteOnboardingUseCase } from 'src/modules/users/use-cases/complete-onboarding.use-case'
import { MeUseCase } from 'src/modules/users/use-cases/me.use-case'
import { WorkoutPreferenceModule } from '../workout/preference/workout-preference.module'

@Module({
  imports: [WorkoutPreferenceModule, ProfilesModule, DietsPreferenceModule],
  controllers: [UsersController],
  exports: [UsersRepository],
  providers: [
    MeUseCase,
    CompleteOnboardingUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
