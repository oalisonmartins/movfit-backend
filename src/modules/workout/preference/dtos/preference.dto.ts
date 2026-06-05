import { ApiProperty } from '@nestjs/swagger'
import { EmphasizedMuscle } from 'generated/prisma/enums'

export class WorkoutPreferenceResponseDto {
  @ApiProperty({
    title: 'ID da preferência de treino',
    type: 'string',
    format: 'uuid',
  })
  readonly id: string

  @ApiProperty({
    title: 'Dias disponíveis por semana',
    type: 'integer',
    minimum: 1,
    maximum: 7,
  })
  readonly availableDaysPerWeek: number

  @ApiProperty({
    title: 'Tempo disponível por dia (em segundos)',
    type: 'integer',
    minimum: 1,
    maximum: 86_399,
  })
  readonly availableTimePerDayInSeconds: number

  @ApiProperty({
    title: 'Músculos em ênfase',
    enum: [EmphasizedMuscle],
    isArray: true,
    maxItems: 2,
  })
  readonly emphasizedMuscles: EmphasizedMuscle[]

  @ApiProperty({
    title: 'Data de criação',
    type: 'string',
    format: 'date',
  })
  readonly createdAt: Date
}
