import { IsEnum } from 'class-validator'
import { DietGenerationType, DietGoal } from 'generated/prisma/enums'

export class SetDietPreferenceDto {
  @IsEnum(DietGoal)
  readonly goal: DietGoal

  @IsEnum(DietGenerationType)
  readonly generationType: DietGenerationType
}
