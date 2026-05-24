import { Injectable } from '@nestjs/common'
import { CreateNutritionEntryInput } from 'src/modules/nutritions/types/create-nutrition-entry.types'
import { NutritionEntryWithFood } from 'src/modules/nutritions/types/nutrition-entry-with-food.types'

@Injectable()
export abstract class NutritionEntryRepository {
  abstract create(userId: string, input: CreateNutritionEntryInput): Promise<NutritionEntryWithFood>
}
