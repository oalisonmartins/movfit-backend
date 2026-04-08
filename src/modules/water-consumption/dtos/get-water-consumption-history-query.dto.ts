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
