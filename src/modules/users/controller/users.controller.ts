import { Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetMeDto } from '../dtos/get-me.dto'
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
  ) {}

  @RequireProfile()
  @UseGuards(JwtAuthGuard, OnboardingGuard)
  @UseInterceptors(ProfileInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get authenticated user details.',
    type: GetMeDto,
  })
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getMe() {
    return this.getMeUseCase.execute()
  }

  @Get('/me/diets')
  @HttpCode(HttpStatus.OK)
  getDiets(@CurrentUser() user: AuthUser) {
    return this.getDietsUseCase.execute(user.id)
  }
}
