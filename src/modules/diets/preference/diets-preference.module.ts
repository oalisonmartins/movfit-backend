import { Module } from '@nestjs/common'
import { PrismaDietsPreferenceRepository } from 'src//infra/database/prisma/repositories/diets/diets-preference.repository'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsPreferenceControler } from 'src/modules/diets/preference/controllers/diets-preference.controller'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { SetDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/set-diets-preference.use-case'
import { UpdateDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-diets-preference.use-case'

@Module({
  controllers: [DietsPreferenceControler],
  exports: [DietsPreferenceRepository],
  providers: [
    SetDietsPreferenceUseCase,
    UpdateDietsPreferenceUseCase,
    PrismaService,
    TransactionService,
    TransactionContextService,
    RequestContextService,
    {
      provide: DietsPreferenceRepository,
      useClass: PrismaDietsPreferenceRepository,
    },
  ],
})
export class DietsPreferenceModule {}
