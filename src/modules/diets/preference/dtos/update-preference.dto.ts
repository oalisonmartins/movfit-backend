import { IsEnum, IsOptional } from 'class-validator'
import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export class UpdateDietPreferenceDto {
  @IsOptional()
  @IsEnum(DietGoal)
  readonly goal?: DietGoal

  @IsOptional()
  @IsEnum(DietGenerationType)
  readonly generationType?: DietGenerationType
}
