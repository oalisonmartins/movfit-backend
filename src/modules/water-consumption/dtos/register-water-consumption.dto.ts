import { Type } from 'class-transformer'
import { IsDate, IsInt } from 'class-validator'

export class RegisterWaterConsumptionDto {
  @IsInt()
  @Type(() => Number)
  amountConsumedInMl: number

  @IsDate()
  @Type(() => Date)
  consumptionDate: Date
}
