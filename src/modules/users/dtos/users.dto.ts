import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, Goal } from 'generated/prisma/enums'

export class ProfileDto {
  @ApiProperty({ enum: Goal, isArray: true })
  readonly goal: Goal

  @ApiProperty({ enum: BiologicalSex, isArray: true })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ type: Date })
  readonly birthDate: Date

  @ApiProperty({ type: 'number' })
  readonly heightInCentimeters: number

  @ApiProperty({ type: 'number' })
  readonly weightInGrams: number

  @ApiProperty({ type: 'number' })
  readonly targetWeightInGrams: number
}

export class WaterConsumptionDto {
  @ApiProperty({ type: 'number' })
  readonly goalInMl: number

  @ApiProperty({ type: 'number' })
  readonly consumedInMl: number
}

export class WaterConsumptionHistoryDto {
  @ApiProperty({ type: 'number' })
  readonly amountInMl: number

  @ApiProperty({ type: Date })
  readonly date: Date
}

export class UserDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'string' })
  readonly name: string

  @ApiProperty({ type: 'string', format: 'email', uniqueItems: true })
  readonly email: string

  @ApiProperty({ type: 'boolean', default: false })
  readonly isOnboardingCompleted: boolean

  @ApiProperty({ type: ProfileDto, nullable: true })
  readonly profile: ProfileDto | null

  @ApiProperty({ type: WaterConsumptionDto, nullable: true })
  readonly waterConsumption: WaterConsumptionDto | null

  @ApiProperty({ type: WaterConsumptionHistoryDto, isArray: true })
  readonly waterConsumptionHistory: WaterConsumptionHistoryDto[]
}
