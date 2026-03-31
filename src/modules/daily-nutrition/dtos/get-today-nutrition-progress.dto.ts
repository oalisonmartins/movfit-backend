import { ApiProperty } from '@nestjs/swagger'

class MacroProgressDto {
  @ApiProperty({ type: 'number' })
  readonly goalInGrams: number

  @ApiProperty({ type: 'number' })
  readonly totalConsumedInGrams: number

  @ApiProperty({ type: 'number' })
  readonly totalConsumedInPercentage: number
}

export class GetTodayNutritionProgressResponseDto {
  @ApiProperty({ type: MacroProgressDto })
  readonly carbs: MacroProgressDto

  @ApiProperty({ type: MacroProgressDto })
  readonly proteins: MacroProgressDto

  @ApiProperty({ type: MacroProgressDto })
  readonly fats: MacroProgressDto
}
