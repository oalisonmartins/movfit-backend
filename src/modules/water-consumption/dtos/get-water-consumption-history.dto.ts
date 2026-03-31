import { ApiProperty } from '@nestjs/swagger'

export class GetWaterConsumptionHistoryResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: Date })
  readonly date: Date

  @ApiProperty({ type: 'integer' })
  readonly amountConsumedInMl: number
}
