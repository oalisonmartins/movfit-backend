import { ApiProperty } from '@nestjs/swagger'

export class GetDailyWaterConsumptionResponseDTO {
  @ApiProperty({ type: 'integer', minimum: 0 })
  readonly consumptionTargetInMl: number
}
