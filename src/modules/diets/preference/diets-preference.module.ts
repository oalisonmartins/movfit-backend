import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { TransactionContextService } from 'src/common/services/transaction-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { PrismaDietsPreferenceRepository } from 'src/infra/database/prisma/repositories/diets/prisma-diets-preference.repository'
import { DietsPreferenceControler } from 'src/modules/diets/preference/controllers/diets-preference.controller'
import { DietsPreferenceRepository } from 'src/modules/diets/preference/repositories/diets-preference.repository'
import { UpdateDietsPreferenceUseCase } from 'src/modules/diets/preference/use-cases/update-diets-preference.use-case'

@Module({
  controllers: [DietsPreferenceControler],
  exports: [DietsPreferenceRepository],
  providers: [
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
