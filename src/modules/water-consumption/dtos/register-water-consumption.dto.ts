import { ApiProperty } from '@nestjs/swagger/dist'
import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class RegisterWaterConsumptionRequestDTO {
  @IsInt()
  @Type(() => Number)
  readonly amountConsumedInMl: number
}

export class RegisterWaterConsumptionResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ type: 'integer' })
  readonly amountConsumedInMl: number

  @ApiProperty({ type: Date })
  readonly dateOfConsumption: Date
}
