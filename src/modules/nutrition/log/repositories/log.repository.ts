import { Injectable } from '@nestjs/common'
import { NutritionLog } from 'generated/prisma/client'
import { NutritionMacros } from 'src/modules/nutrition/types/nutrition-macros.types'

@Injectable()
export abstract class NutritionLogRepository {
  abstract create(userId: string, date: Date, macros?: NutritionMacros): Promise<NutritionLog>
  abstract findOne(userId: string, date: Date): Promise<NutritionLog | null>
}
