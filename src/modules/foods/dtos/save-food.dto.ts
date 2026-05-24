import { ApiProperty } from '@nestjs/swagger/dist'
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'
import { FoodSource } from 'generated/prisma/enums'

export class NutritionalInfosDTO {
  @ApiProperty({ title: 'Calories in kcal', type: 'number' })
  calorieInKcal: number

  @ApiProperty({ title: 'Proteins in grams', type: 'number' })
  proteinInGrams: number

  @ApiProperty({ title: 'Carbs in grams', type: 'number' })
  carbInGrams: number

  @ApiProperty({ title: 'Fats in grams', type: 'number' })
  fatInGrams: number
}

export class SaveFoodRequestDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsOptional()
  @IsBoolean()
  readonly isRecipe?: boolean

  @IsOptional()
  @IsString()
  readonly description?: string

  @IsOptional()
  @IsString()
  readonly coverImageUrl?: string

  @IsEnum(FoodSource)
  @IsNotEmpty()
  readonly source: FoodSource

  @IsInt()
  @Min(0)
  readonly caloriePer100gInKcal: number

  @IsInt()
  @Min(0)
  readonly proteinPer100gInGrams: number

  @IsInt()
  @Min(0)
  readonly carbPer100gInGrams: number

  @IsInt()
  @Min(0)
  readonly fatPer100gInGrams: number
}

export class SaveFoodResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'Description', type: 'string', nullable: true })
  readonly description: string | null

  @ApiProperty({ title: 'Amount', type: 'integer' })
  readonly amountInGrams: number

  @ApiProperty({ title: 'Nutritional infos', type: NutritionalInfosDTO })
  readonly nutritionalInfos: NutritionalInfosDTO
}
