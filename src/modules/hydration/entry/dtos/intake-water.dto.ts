import { IsInt, Min } from 'class-validator'

export class IntakeWaterDto {
  @IsInt()
  @Min(1)
  readonly amountInMl: number
}
