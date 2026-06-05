import { ApiProperty } from '@nestjs/swagger'
import { WorkoutGoal } from 'generated/prisma/enums'

export class ActiveWorkoutPlanDto {
  @ApiProperty({
    title: 'ID do plano de treino',
    type: 'string',
    format: 'uuid',
  })
  readonly id: string

  @ApiProperty({
    title: 'Nome do plano de treino',
    type: 'string',
  })
  readonly name: string

  @ApiProperty({
    title: 'Objetivo do plano de treino',
    enum: WorkoutGoal,
  })
  readonly goal: WorkoutGoal

  @ApiProperty({
    title: 'Data de criação do plano de treino',
    type: Date,
    format: 'date',
  })
  readonly createdAt: Date
}
