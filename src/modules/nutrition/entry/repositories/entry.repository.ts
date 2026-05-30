import { Injectable } from '@nestjs/common'
import { CreateNutritionEntryInput } from 'src/modules/nutrition/entry/types/create-entry.types'
import { NutritionEntryWithFood } from 'src/modules/nutrition/entry/types/entry-with-food.types'

@Injectable()
export abstract class NutritionEntryRepository {
  abstract create(userId: string, input: CreateNutritionEntryInput): Promise<NutritionEntryWithFood>
}
