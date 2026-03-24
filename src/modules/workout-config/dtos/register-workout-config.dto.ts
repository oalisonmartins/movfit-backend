import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { FocusMuscle } from 'generated/prisma/enums'

export class RegisterWorkoutConfigDto {
  @IsInt()
  @Min(1)
  @Max(7)
  freeDaysPerWeek: number

  @IsInt()
  @Min(1)
  @Max(86400)
  freeTimeByDayInSeconds: number

  @IsOptional()
  @ArrayMaxSize(2)
  @IsArray()
  @IsEnum(FocusMuscle, { each: true })
  focusMuscles?: FocusMuscle[]
}
