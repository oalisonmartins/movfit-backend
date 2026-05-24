import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import {
  GetWorkoutConfigResponseDTO,
  RegisterWorkoutConfigRequestDTO,
  RegisterWorkoutConfigResponseDTO,
} from 'src/modules/workout-config/dtos'
import { GetWorkoutConfigUseCase } from 'src/modules/workout-config/use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from 'src/modules/workout-config/use-cases/register-workout-config.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('workout-config')
export class WorkoutConfigController {
  constructor(
    private readonly registerWorkoutConfigUseCase: RegisterWorkoutConfigUseCase,
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
  ) {}

  @ApiOkResponse({ type: GetWorkoutConfigResponseDTO })
  @Get()
  getWorkoutConfig(@CurrentUser() user: AuthUser) {
    return this.getWorkoutConfigUseCase.execute(user.id)
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: RegisterWorkoutConfigResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  registerWorkoutConfig(@Body() body: RegisterWorkoutConfigRequestDTO) {
    return this.registerWorkoutConfigUseCase.execute(body)
  }
}
