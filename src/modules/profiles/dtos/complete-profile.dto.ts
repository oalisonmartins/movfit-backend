import { ApiProperty } from '@nestjs/swagger/dist'
import { IsDate, IsEnum, IsInt, IsString, IsTimeZone } from 'class-validator'
import { BiologicalSex, Goal } from 'generated/prisma/enums'
import { TransformDate } from 'src/common/decorators/transform-date.decorator'

export class CompleteProfileRequestDTO {
  @IsEnum(Goal)
  readonly goal: Goal

  @IsEnum(BiologicalSex)
  readonly biologicalSex: BiologicalSex

  @IsDate()
  @TransformDate()
  readonly birthDate: Date

  @IsInt()
  readonly heightInCentimeters: number

  @IsInt()
  readonly weightInKg: number

  @IsInt()
  readonly targetWeightInKg: number

  @IsTimeZone()
  @IsString()
  readonly timezone: string
}

export class CompleteProfileResponseDTO {
  @ApiProperty({ title: 'Profile ID', type: 'string', format: 'uuid ' })
  readonly id: string

  @ApiProperty({ title: 'User weight in kg', type: 'integer' })
  readonly weightInKg: number

  @ApiProperty({ title: 'User target weight in kg', type: 'integer' })
  readonly targetWeightInKg: number

  @ApiProperty({ title: 'User height in centimeters', type: 'integer' })
  readonly heightInCentimeters: number

  @ApiProperty({ title: 'User biological sex', enum: BiologicalSex })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ title: 'User timezone', example: 'America/Sao_Paulo', type: 'string' })
  readonly timezone: string

  @ApiProperty({ title: 'User birth date', example: 'DD/MM/YYYY', type: 'string' })
  readonly birthDate: string

  @ApiProperty({ title: 'User goal', enum: Goal })
  readonly goal: Goal
}
