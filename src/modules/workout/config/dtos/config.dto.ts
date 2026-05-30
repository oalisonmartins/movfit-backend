import { ApiProperty } from '@nestjs/swagger'
import { FocusMuscle } from 'generated/prisma/enums'

export class WorkoutConfigResponseDto {
  @ApiProperty({
    title: 'Id da configuração de treino (uuid)',
    type: 'string',
    format: 'uuid',
  })
  readonly id: string

  @ApiProperty({
    title: 'Dias livres para treinar (por semana)',
    type: 'integer',
    minimum: 1,
    maximum: 7,
  })
  readonly freeDaysPerWeek: number

  @ApiProperty({
    title: 'Tempo livre por dia (em segundos)',
    type: 'integer',
    minimum: 1,
    maximum: 86_399,
  })
  readonly freeTimeByDayInSeconds: number

  @ApiProperty({
    title: 'Músculos para dar ênfase/foco (no máximo 2)',
    enum: [FocusMuscle],
    isArray: true,
    maxItems: 2,
  })
  readonly focusMuscles: FocusMuscle[]

  @ApiProperty({
    title: 'Data em que a configuração de treino foi criada (DD/MM/YYYY)',
    type: 'string',
    format: 'date',
  })
  readonly createdAt: string
}
