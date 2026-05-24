import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { DietGoal } from 'generated/prisma/enums'

class FoodDTO {
  @IsUUID()
  readonly foodId: string

  @IsInt()
  @Min(1)
  readonly amountInGrams: number
}

class MealDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string

  @IsInt()
  @Min(0)
  @Max(86399)
  readonly scheduleTimeInSeconds: number

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FoodDTO)
  readonly foods: FoodDTO[]
}

class MacrosDTO {
  @ApiProperty({ type: 'integer' })
  readonly calorieInKcal: number

  @ApiProperty({ type: 'integer' })
  readonly proteinInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly carbInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly fatInGrams: number
}

export class CreateDietRequestDTO {
  @IsEnum(DietGoal)
  readonly goal: DietGoal

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MealDTO)
  readonly meals: MealDTO[]
}

export class CreateDietResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'boolean', default: false })
  readonly isActive: boolean

  @ApiProperty({ enum: DietGoal })
  readonly goal: DietGoal

  @ApiProperty({ type: MacrosDTO })
  readonly macros: MacrosDTO
}
