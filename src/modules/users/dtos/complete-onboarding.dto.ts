import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsInt, IsTimeZone } from 'class-validator'
import { BiologicalSex, Goal } from 'generated/prisma/enums'

export class CompleteOnboardingDto {
  @IsEnum(Goal)
  readonly goal: Goal

  @IsEnum(BiologicalSex)
  readonly biologicalSex: BiologicalSex

  @IsDate()
  @Type(() => Date)
  readonly birthDate: Date

  @IsInt()
  readonly heightInCentimeters: number

  @IsInt()
  readonly weightInGrams: number

  @IsInt()
  readonly targetWeightInGrams: number

  @IsTimeZone()
  readonly timezone: string
}
