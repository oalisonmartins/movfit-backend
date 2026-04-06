import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetDietsQueryDTO } from '../dtos/get-diets-query.dto'
import { GetActiveDietUseCase } from '../use-cases/get-active-diet.use-case'
import { GetDietsUseCase } from '../use-cases/get-diets.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/diets', version: '1' })
export class DietsController {
  constructor(
    private readonly getDietsUseCase: GetDietsUseCase,
    private readonly getActiveDietUseCase: GetActiveDietUseCase,
  ) {}

  @Get()
  getDiets(@CurrentUser() user: AuthUser, @Query() query: GetDietsQueryDTO) {
    const { isActive = false } = query
    if (isActive) {
      return this.getActiveDietUseCase.execute(user.id)
    }
    return this.getDietsUseCase.execute(user.id)
  }
}
