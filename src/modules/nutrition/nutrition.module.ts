import { Module } from '@nestjs/common'
import { NutritionEntryModule } from 'src/modules/nutrition/entry/entry.module'
import { NutritionLogModule } from 'src/modules/nutrition/log/log.module'

@Module({
  imports: [NutritionEntryModule, NutritionLogModule],
})
export class NutritionModule {}
