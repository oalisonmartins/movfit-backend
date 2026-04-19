import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { CreateDietRequestBodyDTO } from '../dtos/create-diet.dto'
import { DeleteDietQueryDTO } from '../dtos/delete-diet-query.dto'
import { GetDietsQueryDTO } from '../dtos/get-diets-query.dto'
import { CreateDietUseCase } from '../use-cases/create-diet.use-case'
import { DeleteDietUseCase } from '../use-cases/delete-diet.use-case'
import { GetActiveDietUseCase } from '../use-cases/get-active-diet.use-case'
import { GetDietsUseCase } from '../use-cases/get-diets.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/diets', version: '1' })
export class DietsController {
  constructor(
    private readonly getDietsUseCase: GetDietsUseCase,
    private readonly getActiveDietUseCase: GetActiveDietUseCase,
    private readonly createDietUseCase: CreateDietUseCase,
    private readonly deleteDietUseCase: DeleteDietUseCase,
  ) {}

  @Get()
  getDiets(@CurrentUser() user: AuthUser, @Query() query: GetDietsQueryDTO) {
    const { isActive = false } = query
    if (isActive) {
      return this.getActiveDietUseCase.execute(user.id)
    }
    return this.getDietsUseCase.execute(user.id)
  }

  @Post()
  createDiet(@Body() body: CreateDietRequestBodyDTO) {
    return this.createDietUseCase.execute({
      name: body.name,
      goal: body.goal,
      meals: body.meals,
    })
  }

  @Delete()
  deleteDiet(@CurrentUser() user: AuthUser, @Query() query: DeleteDietQueryDTO) {
    return this.deleteDietUseCase.execute({
      dietId: query.dietId,
      userId: user.id,
    })
  }
}
