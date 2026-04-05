import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { GetWorkoutConfigResponseDto } from '../dtos/get-workout-config-response.dto'
import {
  RegisterWorkoutConfigRequestDto,
  RegisterWorkoutConfigResponseDto,
} from '../dtos/register-workout-config.dto'
import { GetWorkoutConfigUseCase } from '../use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from '../use-cases/register-workout-config.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/workout-config', version: '1' })
export class WorkoutConfigController {
  constructor(
    private readonly registerWorkoutConfigUseCase: RegisterWorkoutConfigUseCase,
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
  ) {}

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get current user workout config.',
    type: GetWorkoutConfigResponseDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getWorkoutConfig(@CurrentUser() user: AuthUser) {
    return this.getWorkoutConfigUseCase.execute({ userId: user.id })
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register a new user workout config.',
    type: RegisterWorkoutConfigResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerWorkoutConfig(@Body() dto: RegisterWorkoutConfigRequestDto) {
    return this.registerWorkoutConfigUseCase.execute(dto)
  }
}
