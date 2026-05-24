import { IsDate } from 'class-validator'
import { TransformDate } from 'src/modules/profiles/decorators/transform-date.decorator'

export class GetNutritionProgressDto {
  @IsDate()
  @TransformDate()
  readonly date: Date
}
