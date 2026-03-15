import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { HashModule } from '../hash/hash.module';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { JwtAuthModule } from '../auth/jwt-auth.module';
import { UpdateUserMetricsUseCase } from './use-cases/update-user-metrics.use-case';

@Module({
  imports: [HashModule, JwtAuthModule],
  exports: [UsersRepository, CreateUserUseCase],
  controllers: [UsersController],
  providers: [
    UpdateUserMetricsUseCase,
    CreateUserUseCase,
    GetMeUseCase,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
