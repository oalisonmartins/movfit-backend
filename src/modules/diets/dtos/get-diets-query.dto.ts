import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class GetDietsQueryDTO {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean
}
