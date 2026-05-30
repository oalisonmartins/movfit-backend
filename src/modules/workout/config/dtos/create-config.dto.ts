import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { FocusMuscle } from 'generated/prisma/enums'

export class CreateWorkoutConfigRequestDto {
  @IsInt({
    message: 'Os dias precisam ser números inteiros',
  })
  @Min(1, {
    message: 'Você precisa ter pelo menos 1 dia livre para treinar por semana',
  })
  @Max(7)
  readonly freeDaysPerWeek: number

  @IsInt()
  @Min(1, {
    message: 'Você precisa ter no mínimo 1 segundo livre para treinar por dia',
  })
  @Max(86_400)
  readonly freeTimeByDayInSeconds: number

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2, {
    message: 'Você pode escolher dar ênfase à no máximo 2 músculos por vez',
  })
  @IsEnum(FocusMuscle, { each: true })
  readonly focusMuscles?: FocusMuscle[]
}
