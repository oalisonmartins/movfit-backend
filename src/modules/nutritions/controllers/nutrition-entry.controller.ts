import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { AddNutritionEntryRequestDto } from 'src/modules/nutritions/dtos/add-nutrition-entry.dto'
import { AddNutritionEntryUseCase } from 'src/modules/nutritions/use-cases/add-nutrition-entry.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('nutrition-entry')
export class NutritionEntryController {
  constructor(private readonly addNutritionEntryUseCase: AddNutritionEntryUseCase) {}

  @Post()
  addNutritionEntry(@Body() body: AddNutritionEntryRequestDto) {
    return this.addNutritionEntryUseCase.execute(body)
  }
}
