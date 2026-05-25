import { IsDate } from 'class-validator'
import { TransformDate } from 'src/common/decorators/transform-date.decorator'

export class GetHydrationHistoryDto {
  @IsDate()
  @TransformDate()
  readonly from: Date

  @IsDate()
  @TransformDate()
  readonly to: Date
}
