import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { ProfilesModule } from 'src/modules/profiles/profiles.module'
import { WorkoutConfigController } from 'src/modules/workout-config/controller/workout-config.controller'
import { PrismaWorkoutConfigRepository } from 'src/modules/workout-config/repositories/prisma-workout-config.repository'
import { WorkoutConfigRepository } from 'src/modules/workout-config/repositories/workout-config.repository'
import { GetWorkoutConfigUseCase } from 'src/modules/workout-config/use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from 'src/modules/workout-config/use-cases/register-workout-config.use-case'

@Module({
  imports: [ProfilesModule],
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
