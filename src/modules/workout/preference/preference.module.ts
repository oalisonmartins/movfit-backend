import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaWorkoutPreferenceRepository } from 'src/infra/database/repositories/workout/preference/workout-preference.repository'
import { WorkoutPreferenceController } from 'src/modules/workout/preference/controllers/preference.controller'
import { WorkoutPreferenceRepository } from 'src/modules/workout/preference/repositories/preference.repository'
import { CreateWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/create-preference.use-case'
import { GetWorkoutPreferenceUseCase } from 'src/modules/workout/preference/use-cases/get-preference.use-case'

@Module({
  controllers: [WorkoutPreferenceController],
  exports: [WorkoutPreferenceRepository],
  providers: [
    GetWorkoutPreferenceUseCase,
    CreateWorkoutPreferenceUseCase,
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
