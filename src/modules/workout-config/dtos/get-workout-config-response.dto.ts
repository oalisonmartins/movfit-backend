import { ApiProperty } from '@nestjs/swagger'
import { FocusMuscle } from 'generated/prisma/enums'
export class GetWorkoutConfigResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 7 })
  readonly freeDaysPerWeek: number
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 86_399 })
  readonly freeTimeByDayInSeconds: number
  @ApiProperty({ enum: [FocusMuscle], isArray: true, maxItems: 2 })
  readonly focusMuscles: FocusMuscle[]
}
