import { IsDate, IsInt, IsString, IsUUID, Min } from 'class-validator'
import { TransformDate } from 'src/modules/profiles/decorators/transform-date.decorator'

export class AddNutritionEntryRequestDto {
  @IsString({ message: 'Insira o ID de um alimento válido.' })
  @IsUUID()
  readonly foodId: string

  @IsString({ message: 'Insira o ID de uma refeição válida.' })
  @IsUUID()
  readonly mealId: string

  @IsString({ message: 'Insira o ID de uma dieta válida.' })
  @IsUUID()
  readonly dietId: string

  @IsDate({ message: 'Insira uma data válida.' })
  @TransformDate()
  readonly date: Date

  @IsInt({ message: 'A quantidade precisa ser um número.' })
  @Min(1, { message: 'Insira uma quantidade válida.' })
  readonly amountInGrams: number
}
