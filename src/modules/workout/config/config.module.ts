import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaWorkoutConfigRepository } from 'src/infra/database/repositories/workout/config/workout-config.repository'
import { WorkoutConfigController } from 'src/modules/workout/config/controllers/config.controller'
import { WorkoutConfigRepository } from 'src/modules/workout/config/repositories/config.repository'
import { CreateWorkoutConfigUseCase } from 'src/modules/workout/config/use-cases/create-config.use-case'
import { GetWorkoutConfigUseCase } from 'src/modules/workout/config/use-cases/get-config.use-case'

@Module({
  controllers: [WorkoutConfigController],
  exports: [WorkoutConfigRepository],
  providers: [
    GetWorkoutConfigUseCase,
    CreateWorkoutConfigUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: WorkoutConfigRepository,
      useClass: PrismaWorkoutConfigRepository,
    },
  ],
})
export class WorkoutConfigModule {}
