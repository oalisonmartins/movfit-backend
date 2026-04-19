import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { FoodsModule } from '../foods/foods.module'
import { MealsModule } from '../meals/meals.module'
import { ProfileModule } from '../profile/profile.module'
import { DietsController } from './controller/diets.controller'
import { DietsRepository } from './repositories/diets.repository'
import { PrismaDietsRepository } from './repositories/prisma-diets.repository'
import { CreateDietUseCase } from './use-cases/create-diet.use-case'
import { DeleteDietUseCase } from './use-cases/delete-diet.use-case'
import { GetActiveDietUseCase } from './use-cases/get-active-diet.use-case'
import { GetDietsUseCase } from './use-cases/get-diets.use-case'

@Module({
  imports: [MealsModule, FoodsModule, ProfileModule],
  controllers: [DietsController],
  exports: [DietsRepository],
  providers: [
    PrismaService,
    RequestContextService,
    GetDietsUseCase,
    GetActiveDietUseCase,
    CreateDietUseCase,
    DeleteDietUseCase,
    {
      provide: DietsRepository,
      useClass: PrismaDietsRepository,
    },
  ],
})
export class DietsModule {}
