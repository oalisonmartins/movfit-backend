import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CompleteOnboardingDto } from '../dtos/complete-onboarding.dto'
import { GetMeDto } from '../dtos/get-me.dto'
import type { UserAuth } from '../types/users.type'
import { CompleteOnboardingUseCase } from '../use-cases/complete-onboarding.use-case'
import { GetDietsUseCase } from '../use-cases/get-diets.use-case'
import { GetMeUseCase } from '../use-cases/get-me.use-case'

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly getMeUseCase: GetMeUseCase,
    private readonly getDietsUseCase: GetDietsUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get authenticated user details.',
    type: GetMeDto,
  })
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getMe(@AuthenticatedUser() user: UserAuth) {
    return this.getMeUseCase.execute({ userId: user.id })
  }

  @Get('/me/diets')
  @HttpCode(HttpStatus.OK)
  getDiets(@AuthenticatedUser() user: UserAuth) {
    return this.getDietsUseCase.execute({ userId: user.id })
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Complete user onboarding.',
  })
  @Patch('/me/onboarding')
  @HttpCode(HttpStatus.OK)
  completeOnboarding(@AuthenticatedUser() user: UserAuth, @Body() dto: CompleteOnboardingDto) {
    return this.completeOnboardingUseCase.execute({
      userId: user.id,
      biologicalSex: dto.biologicalSex,
      birthDate: dto.birthDate,
      goal: dto.goal,
      heightInCentimeters: dto.heightInCentimeters,
      targetWeightInGrams: dto.targetWeightInGrams,
      weightInGrams: dto.weightInGrams,
      timezone: dto.timezone,
    })
  }
}
