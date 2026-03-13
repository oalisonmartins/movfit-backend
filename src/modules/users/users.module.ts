import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaUsersRepository } from 'src/infra/database/prisma/repositories/prisma-users-repository';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
