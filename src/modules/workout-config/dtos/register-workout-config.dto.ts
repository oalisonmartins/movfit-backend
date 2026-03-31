import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { FocusMuscle } from 'generated/prisma/enums'

export class RegisterWorkoutConfigRequestDto {
  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(1)
  @Max(7)
  readonly freeDaysPerWeek: number

  @ApiProperty({ type: 'integer' })
  @IsInt()
  @Min(1)
  @Max(86400)
  readonly freeTimeByDayInSeconds: number

  @ApiProperty({ enum: FocusMuscle, isArray: true })
  @IsEnum(FocusMuscle, { each: true })
  @IsArray()
  @ArrayMaxSize(2)
  @IsOptional()
  readonly focusMuscles?: FocusMuscle[]
}

export class RegisterWorkoutConfigResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid', uniqueItems: true })
  readonly id: string

  @ApiProperty({ type: 'integer' })
  readonly freeDaysPerWeek: number

  @ApiProperty({ type: 'integer' })
  readonly freeTimeByDayInSeconds: number

  @ApiProperty({ enum: FocusMuscle, isArray: true })
  readonly focusMuscles: FocusMuscle[]
}
