import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDailyNutritionDto {
  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  proteinsInGrams?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  carbsInGrams?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  fatsInGrams?: number;
}
