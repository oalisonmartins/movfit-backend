import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class RegisterWaterConsumptionRequestDTO {
  @IsInt()
  @Type(() => Number)
  readonly amountConsumedInMl: number
}
