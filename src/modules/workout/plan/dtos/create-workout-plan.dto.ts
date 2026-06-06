import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { WeekDay, WorkoutGoal } from 'generated/prisma/enums'

class WorkoutDayDto {
  @IsString({
    message: 'O nome do treino deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O nome do treino é obrigatório',
  })
  readonly name: string

  @IsBoolean({
    message: 'Defina se é um dia de descanso ou não',
  })
  readonly isRest: boolean

  @IsInt({
    message: 'A estimativa de duração do treino deve ser um número inteiro',
  })
  @Min(0, {
    message: 'Estimativa de tempo inválida',
  })
  readonly estimatedDurationInSeconds: number

  @IsOptional()
  @IsString({
    message: 'A imagem de capa do treino deve ser uma string',
  })
  readonly coverImageUrl?: string

  @IsEnum(WeekDay, {
    message: 'Escolha um dia da semana válido',
  })
  readonly weekDay: WeekDay

  @IsArray({
    message: 'Os exercícios precisam ser uma lista',
  })
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDto)
  readonly exercises: WorkoutExerciseDto[]
}

class WorkoutExerciseDto {
  @IsString({
    message: 'O nome do exercício deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O nome do exercício é obrigatório',
  })
  readonly name: string

  @IsInt({
    message: 'A ordem do exercício deve ser um número inteiro',
  })
  @Min(0, {
    message: 'Escolha um número inteiro maior ou igual a 0 para a ordem do exercício',
  })
  readonly order: number

  @IsInt({ message: 'As repetições do execício deve ser um número inteiro' })
  @Min(0, {
    message: 'Escolha um número inteiro maior ou igual a 0 para as de repetições do exercício',
  })
  readonly reps: number

  @IsInt({ message: 'As séries do execício deve ser um número inteiro' })
  @Min(0, {
    message: 'Escolha um número inteiro maior ou igual a 0 para as de séries do exercício',
  })
  readonly sets: number

  @IsInt({ message: 'O tempo de descanso do exercício deve ser um número inteiro' })
  @Min(0, {
    message: 'Escolha um número inteiro maior ou igual a 0 para o tempo de descanso do exercício',
  })
  readonly restTimeInSeconds: number
}

export class CreateWorkoutPlanRequestDto {
  @IsString({
    message: 'O nome do plano de treino deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O nome do plano de treino é obrigatório',
  })
  readonly name: string

  @IsEnum(WorkoutGoal, {
    message: 'Escolha um objetivo de treino válido',
  })
  readonly goal: WorkoutGoal

  @IsArray({
    message: 'Os dias de treino precisam ser uma lista',
  })
  @ValidateNested({ each: true })
  @Type(() => WorkoutDayDto)
  readonly workoutDays: WorkoutDayDto[]
}
