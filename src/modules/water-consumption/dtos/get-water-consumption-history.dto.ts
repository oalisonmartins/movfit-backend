import { ApiProperty } from '@nestjs/swagger/dist'
import { Transform } from 'class-transformer'
import { IsDate } from 'class-validator'
import { parseDate } from '../helpers/parse-date.helper'

export class GetWaterConsumptionHistoryQueryDTO {
  @IsDate()
  @Transform(({ value }) => parseDate(value))
  readonly fromDate: Date

  @IsDate()
  @Transform(({ value }) => parseDate(value))
  readonly toDate: Date
}

export class GetWaterConsumptionHistoryResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'integer' })
  readonly amountConsumedInMl: number

  @ApiProperty({ type: Date })
  readonly dateOfConsumption: Date
}
