import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger/dist'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { CreateDietUseCase } from 'src/modules/diets/use-cases/create-diet.use-case'
import { DeleteDietUseCase } from 'src/modules/diets/use-cases/delete-diet.use-case'
import { GetDietsUseCase } from 'src/modules/diets/use-cases/get-diets.use-case'
import {
  CreateDietRequestDTO,
  CreateDietResponseDTO,
  DeleteDietDTO,
  GetDietsQueryDTO,
  GetDietsResponseDTO,
} from '../dtos'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/diets', version: '1' })
export class DietsController {
  constructor(
    private readonly getDietsUseCase: GetDietsUseCase,
    private readonly createDietUseCase: CreateDietUseCase,
    private readonly deleteDietUseCase: DeleteDietUseCase,
  ) {}

  @ApiOkResponse({ type: GetDietsResponseDTO })
  @Get()
  getDiets(@CurrentUser() user: AuthUser, @Query() query: GetDietsQueryDTO) {
    return this.getDietsUseCase.execute(user.id, query.isActive)
  }

  @ApiCreatedResponse({ type: CreateDietResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createDiet(@Body() body: CreateDietRequestDTO) {
    return this.createDietUseCase.execute({
      goal: body.goal,
      meals: body.meals,
    })
  }

  @ApiOkResponse({ type: DeleteDietDTO })
  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteDiet(@CurrentUser() user: AuthUser, @Query() query: DeleteDietDTO) {
    return this.deleteDietUseCase.execute({
      dietId: query.dietId,
      userId: user.id,
    })
  }
}
