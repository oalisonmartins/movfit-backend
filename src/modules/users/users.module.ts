import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileModule } from '../profile/profile.module'
import { WorkoutConfigModule } from '../workout-config/workout-config.module'
import { UsersController } from './controller/users.controller'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { UsersRepository } from './repositories/users-repository'
import { GetDietsUseCase } from './use-cases/get-diets.use-case'
import { GetMeUseCase } from './use-cases/get-me.use-case'

@Module({
  imports: [WorkoutConfigModule, ProfileModule],
  exports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    PrismaService,
    RequestContextService,
    GetMeUseCase,
    GetDietsUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
