import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { UserAuth } from 'src/modules/users/types/users.type'
import { GetWorkoutConfigResponseDto } from '../dtos/get-workout-config-response.dto'
import {
  RegisterWorkoutConfigRequestDto,
  RegisterWorkoutConfigResponseDto,
} from '../dtos/register-workout-config.dto'
import { GetWorkoutConfigUseCase } from '../use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from '../use-cases/register-workout-config.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({
  path: '/workout-config',
  version: '1',
})
export class WorkoutConfigController {
  constructor(
    private readonly registerWorkoutConfigUseCase: RegisterWorkoutConfigUseCase,
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get current user workout config.',
    type: GetWorkoutConfigResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getWorkoutConfig(@AuthenticatedUser() user: UserAuth) {
    return this.getWorkoutConfigUseCase.execute({
      userId: user.id,
    })
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register a new user workout config.',
    type: RegisterWorkoutConfigResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerWorkoutConfig(
    @AuthenticatedUser() user: UserAuth,
    @Body() dto: RegisterWorkoutConfigRequestDto,
  ) {
    return this.registerWorkoutConfigUseCase.execute({
      freeDaysPerWeek: dto.freeDaysPerWeek,
      freeTimeByDayInSeconds: dto.freeTimeByDayInSeconds,
      focusMuscles: dto.focusMuscles,
      userId: user.id,
    })
  }
}
