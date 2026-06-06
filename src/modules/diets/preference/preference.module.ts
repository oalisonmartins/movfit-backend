import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaDietPreferenceRepository } from 'src/infra/database/repositories/diets/preference/diet-preference.repository'
import { DietPreferenceControler } from 'src/modules/diets/preference/controllers/preference.controller'
import { DietPreferenceRepository } from 'src/modules/diets/preference/repositories/preference.repository'
import { SetDietPreferenceUseCase } from 'src/modules/diets/preference/use-cases/set-preference.use-case'
import { UpdateDietPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-preference.use-case'

@Module({
  controllers: [DietPreferenceControler],
  exports: [DietPreferenceRepository],
  providers: [
    SetDietPreferenceUseCase,
    UpdateDietPreferenceUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: DietPreferenceRepository,
      useClass: PrismaDietPreferenceRepository,
    },
  ],
})
export class DietPreferenceModule {}
