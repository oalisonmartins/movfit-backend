import { IsDate, IsEnum, IsInt, IsString, IsTimeZone } from 'class-validator'
import { BiologicalSex, FitnessLevel } from 'generated/prisma/enums'
import { TransformDate } from 'src/common/decorators/transform-date.decorator'

export class SetPersonalInfosDto {
  @IsEnum(BiologicalSex)
  readonly biologicalSex: BiologicalSex

  @IsDate()
  @TransformDate()
  readonly birthDate: Date

  @IsEnum(FitnessLevel)
  readonly fitnessLevel: FitnessLevel

  @IsInt()
  readonly heightInCm: number

  @IsInt()
  readonly weightInKg: number

  @IsInt()
  readonly targetWeightInKg: number

  @IsTimeZone()
  @IsString()
  readonly timezone: string
}
