import { ApiProperty } from '@nestjs/swagger/dist'

export class GetWaterConsumptionProgressResponseDTO {
  @ApiProperty({ type: 'integer' })
  readonly consumptionTargetInMl: number

  @ApiProperty({ type: 'integer' })
  readonly totalConsumedInMl: number

  @ApiProperty({ type: 'number', maximum: 100 })
  readonly progressPercentage: number
}
