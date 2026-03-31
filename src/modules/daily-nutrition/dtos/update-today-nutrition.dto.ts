import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsPositive } from 'class-validator'

export class UpdateTodayNutritionRequestDto {
  @ApiProperty({ type: 'number', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly proteinsInGrams?: number

  @ApiProperty({ type: 'number', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly carbsInGrams?: number

  @ApiProperty({ type: 'number', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly fatsInGrams?: number
}

export class UpdateTodayNutritionResponseDto {
  @ApiProperty({ type: Date })
  readonly day: Date

  @ApiProperty({ type: 'integer' })
  readonly proteinsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly carbsInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly fatsInGrams: number
}
