import { ApiProperty } from '@nestjs/swagger'

export class GetTodayWaterConsumptionProgressResponseDto {
  @ApiProperty({ type: 'integer' })
  readonly goalDailyConsumptionInMl: number

  @ApiProperty({ type: 'integer' })
  readonly todayConsumptionInMl: number

  @ApiProperty({ type: 'integer' })
  readonly todayConsumptionInPercentage: number
}
