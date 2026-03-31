import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class RegisterTodayWaterConsumptionDto {
  @ApiProperty({ type: 'integer' })
  @IsInt()
  readonly amountConsumedInMl: number
}
