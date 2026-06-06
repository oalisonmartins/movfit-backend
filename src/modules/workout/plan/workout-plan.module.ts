import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaWorkoutPlanRepository } from 'src/infra/database/prisma/repositories/workout/prisma-workout-plan.repository'
import { WorkoutPlanController } from 'src/modules/workout/plan/controllers/workout-plan.controller'
import { WorkoutPlanRepository } from 'src/modules/workout/plan/repositories/workout-plan.repository'
import { CreateWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/create-workout-plan.use-case'
import { GetActiveWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/get-active-workout-plan.use-case'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/workout-preference.module'

@Module({
  imports: [WorkoutPreferenceModule],
  controllers: [WorkoutPlanController],
  exports: [WorkoutPlanRepository],
  providers: [
    CreateWorkoutPlanUseCase,
    GetActiveWorkoutPlanUseCase,
    PrismaService,
    RequestContextService,
    TransactionContextService,
    TransactionService,
    {
      provide: WorkoutPlanRepository,
      useClass: PrismaWorkoutPlanRepository,
    },
  ],
})
export class WorkoutPlanModule {}
