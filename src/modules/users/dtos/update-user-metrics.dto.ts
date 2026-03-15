import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { BiologicalSex, UserGoal } from 'generated/prisma/enums';

export class UpdateUserMetricsInputDto {
  @IsEnum(UserGoal, { message: 'Invalid goal selected.' })
  @IsNotEmpty({ message: 'Goal is required.' })
  goal: UserGoal;

  @IsEnum(BiologicalSex, { message: 'Invalid biological sex.' })
  @IsNotEmpty({ message: 'Biological sex is required.' })
  biologicalSex: BiologicalSex;

  @IsInt({ message: 'Invalid weight.' })
  @IsNotEmpty({ message: 'Weight is required.' })
  @Min(1, { message: 'Select a valid weight.' })
  @Max(350000, { message: 'Select a valid weight.' })
  weightInGrams: number;

  @IsInt({ message: 'Invalid goal weight.' })
  @IsNotEmpty({ message: 'Goal weight is required.' })
  @Min(1, { message: 'Select a valid goal weight.' })
  @Max(350000, { message: 'Select a valid goal weight.' })
  goalWeightInGrams: number;

  @IsInt({ message: 'Invalid height selected.' })
  @IsNotEmpty({ message: 'Height is required.' })
  @Min(1, { message: 'Select a valid height.' })
  @Max(210, { message: 'Select a valid height.' })
  heightInCentimeters: number;
}
