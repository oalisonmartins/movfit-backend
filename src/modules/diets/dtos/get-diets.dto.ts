import { ApiProperty } from '@nestjs/swagger/dist'
import { IsBoolean, IsOptional } from 'class-validator'
import { DietGoal } from 'generated/prisma/enums'
import { TransformBooleanQuery } from 'src/common/decorators/transform-boolean-query.decorator'

export class GetDietsQueryDTO {
  @IsOptional()
  @IsBoolean()
  @TransformBooleanQuery()
  readonly isActive?: boolean
}

export class GetDietsResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'boolean' })
  readonly isActive: boolean

  @ApiProperty({ enum: DietGoal })
  readonly goal: DietGoal

  @ApiProperty({ type: 'string', format: 'date' })
  readonly createdAt: string

  @ApiProperty({ type: 'number' })
  readonly totalCaloriesInKcal: number

  @ApiProperty({ type: 'number' })
  readonly totalProteinsInGrams: number

  @ApiProperty({ type: 'number' })
  readonly totalCarbsInGrams: number

  @ApiProperty({ type: 'number' })
  readonly totalFatsInGrams: number
}
