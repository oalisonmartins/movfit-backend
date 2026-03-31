import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'
import { GetWorkoutConfigResponse } from '../types/get-workout-config.type'

class UserProfileDto {
  @ApiProperty({ type: 'string', format: 'uuid', uniqueItems: true })
  readonly id: string

  @ApiProperty({ enum: [Goal], isArray: true })
  readonly goal: Goal

  @ApiProperty({ enum: [BiologicalSex], isArray: true })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ type: Date })
  readonly birthDate: Date

  @ApiProperty({ type: 'integer' })
  readonly heightInCentimeters: number

  @ApiProperty({ type: 'integer' })
  readonly weightInGrams: number

  @ApiProperty({ type: 'integer' })
  readonly targetWeightInGrams: number

  @ApiProperty({ type: 'string' })
  readonly timezone: string
}

class WorkoutConfigUserDto {
  @ApiProperty({ type: 'string', format: 'uuid', uniqueItems: true })
  readonly id: string

  @ApiProperty({ type: UserProfileDto, nullable: true })
  readonly profile: UserProfileDto
}

export class GetWorkoutConfigResponseDto implements GetWorkoutConfigResponse {
  @ApiProperty({ type: 'string', format: 'uuid', uniqueItems: true })
  readonly id: string

  @ApiProperty({ type: 'integer' })
  readonly freeDaysPerWeek: number

  @ApiProperty({ type: 'integer' })
  readonly freeTimeByDayInSeconds: number

  @ApiProperty({ enum: [FocusMuscle], isArray: true })
  readonly focusMuscles: FocusMuscle[]

  @ApiProperty({ type: WorkoutConfigUserDto })
  readonly user: WorkoutConfigUserDto
}
