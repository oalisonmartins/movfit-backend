import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfileModule } from '../profile/profile.module'
import { WorkoutConfigController } from './controller/workout-config.controller'
import { PrismaWorkoutConfigRepository } from './repositories/prisma-workout-config.repository'
import { WorkoutConfigRepository } from './repositories/workout-config.repository'
import { GetWorkoutConfigUseCase } from './use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from './use-cases/register-workout-config.use-case'

@Module({
  imports: [ProfileModule],
  controllers: [WorkoutConfigController],
  exports: [WorkoutConfigRepository],
  providers: [
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    RegisterWorkoutConfigUseCase,
    GetWorkoutConfigUseCase,
    {
      provide: WorkoutConfigRepository,
      useClass: PrismaWorkoutConfigRepository,
    },
  ],
})
export class WorkoutConfigModule {}
