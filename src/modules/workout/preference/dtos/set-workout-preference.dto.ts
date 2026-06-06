import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { EmphasizedMuscle, WorkoutGoal } from 'generated/prisma/enums'

export class SetWorkoutPreferenceDto {
  @IsInt({
    message: 'Os dias precisam ser números inteiros',
  })
  @Min(1, {
    message: 'Você precisa ter pelo menos 1 dia disponível por semana',
  })
  @Max(7)
  readonly availableDaysPerWeek: number

  @IsEnum(WorkoutGoal)
  readonly goal: WorkoutGoal

  @IsInt()
  @Min(1, {
    message: 'Você precisa ter pelo menos 1 segundo disponível por dia',
  })
  @Max(86_400)
  readonly availableTimePerDayInSeconds: number

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2, {
    message: 'Você só pode escolher dar ênfase para 2 músculos',
  })
  @IsEnum(EmphasizedMuscle, { each: true })
  readonly emphasizedMuscles?: EmphasizedMuscle[]
}
