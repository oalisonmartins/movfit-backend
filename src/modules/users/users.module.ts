import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { UsersController } from './controllers/users.controller'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { UsersRepository } from './repositories/users-repository'
import { CompleteOnboardingUseCase } from './use-cases/complete-onboarding.use-case'
import { GetDietsUseCase } from './use-cases/get-diets.use-case'
import { GetMeUseCase } from './use-cases/get-me.use-case'

@Module({
  exports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    PrismaService,
    RequestContextService,
    CompleteOnboardingUseCase,
    GetMeUseCase,
    GetDietsUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
