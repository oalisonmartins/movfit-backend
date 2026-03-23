import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { UpdateUserMetricsUseCase } from './use-cases/update-user-metrics.use-case';
import { RequestContextService } from 'src/common/services/request-context.service';

@Module({
  exports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    PrismaService,
    RequestContextService,
    UpdateUserMetricsUseCase,
    GetMeUseCase,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
