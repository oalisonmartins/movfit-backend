import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaWorkoutPlanRepository } from 'src/infra/database/repositories/workout/plan/workout-plan.repository'
import { WorkoutPlanController } from 'src/modules/workout/plan/controllers/plan.controller'
import { WorkoutPlanRepository } from 'src/modules/workout/plan/repositories/plan.repository'
import { CreateWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/create-plan.use-case'
import { GetActiveWorkoutPlanUseCase } from 'src/modules/workout/plan/use-cases/get-active-plan.use-case'
import { WorkoutPreferenceModule } from 'src/modules/workout/preference/preference.module'

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
