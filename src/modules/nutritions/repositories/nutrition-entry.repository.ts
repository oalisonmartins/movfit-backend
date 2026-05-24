import { Injectable } from '@nestjs/common'
import { AddNutritionEntryInput, NutritionEntryWithFood } from 'src/modules/nutritions/types/add-nutrition-entry.types'

@Injectable()
export abstract class NutritionEntryRepository {
  abstract create(userId: string, data: AddNutritionEntryInput): Promise<NutritionEntryWithFood>
}
