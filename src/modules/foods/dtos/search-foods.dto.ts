import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import { IsBoolean, IsInt, IsOptional } from 'class-validator'
import { TransformBooleanQuery } from 'src/common/decorators/transform-boolean-query.decorator'

export class FoodDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'Cover image URL', type: 'string', format: 'uri', nullable: true })
  readonly coverImageUrl?: string

  @ApiProperty({ title: 'Is recipe?', type: 'boolean', default: false })
  readonly isRecipe: boolean

  @ApiProperty({ title: 'Short description', type: 'string', nullable: true })
  readonly description?: string

  @ApiProperty({ title: 'Calorie per 100g (kcal)', type: 'number' })
  readonly caloriePer100gInKcal: number

  @ApiProperty({ title: 'Protein per 100g (g)', type: 'number' })
  readonly proteinPer100gInGrams: number

  @ApiProperty({ title: 'Carb per 100g (g)', type: 'number' })
  readonly carbPer100gInGrams: number

  @ApiProperty({ title: 'Fat per 100g (g)', type: 'number' })
  readonly fatPer100gInGrams: number
}

export class SearchFoodsQueryDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly limit?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly offset?: number

  @IsOptional()
  @IsBoolean()
  @TransformBooleanQuery()
  readonly isRecipe?: boolean
}

export class SearchFoodsResponseDTO {
  @ApiProperty({ title: 'Total foods', type: 'integer', default: 0 })
  readonly total: number

  @ApiProperty({ title: 'Foods list', type: [FoodDTO], isArray: true })
  readonly foods: FoodDTO[]
}
