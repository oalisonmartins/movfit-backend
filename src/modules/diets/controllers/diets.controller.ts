import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger/dist'
import { Throttle } from '@nestjs/throttler'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { RequireDietPreference } from 'src/common/decorators/require-diet-preference.decorator'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { RequireWorkoutPreference } from 'src/common/decorators/require-workout-preference.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { DietPreferenceInterceptor } from 'src/common/interceptors/diet-preference.interceptor'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { WorkoutPreferenceInterceptor } from 'src/common/interceptors/workout-preference.interceptor'
import type { AuthUser } from 'src/common/types/auth-user.types'
import { CreateDietUseCase } from 'src/modules/diets/use-cases/create-diet.use-case'
import { DeleteDietUseCase } from 'src/modules/diets/use-cases/delete-diet.use-case'
import { GetDietsUseCase } from 'src/modules/diets/use-cases/get-diets.use-case'
import { GetMacrosUseCase } from 'src/modules/diets/use-cases/get-macros.use-case'
import {
  CreateDietRequestDTO,
  CreateDietResponseDTO,
  DeleteDietDTO,
  GetDietsQueryDTO,
  GetDietsResponseDTO,
} from '../dtos'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('diets')
export class DietsController {
  constructor(
    private readonly getDietsUseCase: GetDietsUseCase,
    private readonly createDietUseCase: CreateDietUseCase,
    private readonly deleteDietUseCase: DeleteDietUseCase,
    private readonly getMacrosUseCase: GetMacrosUseCase,
  ) {}

  @ApiOkResponse({ type: GetDietsResponseDTO })
  @Get()
  getDiets(@CurrentUser() user: AuthUser, @Query() query: GetDietsQueryDTO) {
    return this.getDietsUseCase.execute(user.id, query.isActive)
  }

  @RequireDietPreference()
  @UseInterceptors(DietPreferenceInterceptor)
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

  @RequireProfile()
  @RequireDietPreference()
  @RequireWorkoutPreference()
  @UseInterceptors(ProfileInterceptor, DietPreferenceInterceptor, WorkoutPreferenceInterceptor)
  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @Get('macros')
  getMacros() {
    return this.getMacrosUseCase.execute()
  }
}
