import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDailyNutritionDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  proteinsInGrams?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  carbsInGrams?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  fatsInGrams?: number;
}
