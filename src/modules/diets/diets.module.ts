import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsController } from './controller/diets.controller'
import { DietsRepository } from './repositories/diets.repository'
import { PrismaDietsRepository } from './repositories/prisma-diets.repository'
import { GetActiveDietUseCase } from './use-cases/get-active-diet.use-case'
import { GetDietsUseCase } from './use-cases/get-diets.use-case'

@Module({
  controllers: [DietsController],
  exports: [DietsRepository],
  providers: [
    PrismaService,
    RequestContextService,
    GetDietsUseCase,
    GetActiveDietUseCase,
    {
      provide: DietsRepository,
      useClass: PrismaDietsRepository,
    },
  ],
})
export class DietsModule {}
