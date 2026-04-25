import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { FocusMuscle } from 'generated/prisma/enums'

export class RegisterWorkoutConfigRequestDTO {
  @IsInt()
  @Min(1)
  @Max(7)
  readonly freeDaysPerWeek: number

  @IsInt()
  @Min(1)
  @Max(86_400)
  readonly freeTimeByDayInSeconds: number

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @IsEnum(FocusMuscle, { each: true })
  readonly focusMuscles?: FocusMuscle[]
}

export class RegisterWorkoutConfigResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 7 })
  readonly freeDaysPerWeek: number
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 86_400 })
  readonly freeTimeByDayInSeconds: number
  @ApiProperty({ enum: FocusMuscle, isArray: true, maxItems: 2 })
  readonly focusMuscles: FocusMuscle[]
}
