import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { HashModule } from '../hash/hash.module';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';

@Module({
  imports: [HashModule],
  exports: [UsersRepository, CreateUserUseCase],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
