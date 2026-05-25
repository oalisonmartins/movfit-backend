import { IsDate, IsOptional } from 'class-validator'
import { TransformDate } from 'src/common/decorators/transform-date.decorator'

export class GetHydrationLogDto {
  @IsOptional()
  @IsDate()
  @TransformDate()
  readonly date: Date
}
