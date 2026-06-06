import { Module } from '@nestjs/common'
import { PrismaWorkoutPreferenceRepository } from 'src//infra/database/prisma/repositories/workout/workout-preference.repository'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { WorkoutPreferenceController } from 'src/modules/workout/preference/controllers/workout-preference.controller'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/workout-preference.repository'
import { GetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/get-workout-preference.use-case'
import { SetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/set-workout-preference.use-case'

@Module({
  controllers: [WorkoutPreferenceController],
  exports: [WorkoutPreferenceRepository],
  providers: [
    GetWorkoutPreferenceUseCase,
    SetWorkoutPreferenceUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: WorkoutPreferenceRepository,
      useClass: PrismaWorkoutPreferenceRepository,
    },
  ],
})
export class WorkoutPreferenceModule {}
