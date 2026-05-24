import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger/dist'
import { Throttle } from '@nestjs/throttler/dist'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import type { AuthUser } from 'src/common/types/auth-user.types'
import {
  SaveFoodRequestDTO,
  SaveFoodResponseDTO,
  SearchFoodsQueryDTO,
  SearchFoodsResponseDTO,
} from 'src/modules/foods/dtos'
import { SaveFoodUseCase } from 'src/modules/foods/use-cases/save-food.use-case'
import { SearchFoodsUseCase } from 'src/modules/foods/use-cases/search-foods.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('foods')
export class FoodsController {
  constructor(
    private readonly searchFoodsUseCase: SearchFoodsUseCase,
    private readonly saveFoodUseCase: SaveFoodUseCase,
  ) {}

  @ApiOkResponse({ type: SearchFoodsResponseDTO })
  @Get()
  searchFoods(@CurrentUser() user: AuthUser, @Query() query: SearchFoodsQueryDTO) {
    return this.searchFoodsUseCase.execute({
      userId: user.id,
      isRecipe: query.isRecipe,
      limit: query.limit ?? 10,
      offset: query.offset ?? 0,
    })
  }

  @Throttle({ heavy: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: SaveFoodResponseDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async saveFood(@CurrentUser() user: AuthUser, @Body() body: SaveFoodRequestDTO) {
    return this.saveFoodUseCase.execute({
      userId: user.id,
      ...body,
    })
  }
}
