import { Module } from '@nestjs/common'
import { HydrationEntryModule } from 'src/modules/hydration/entry/entry.module'
import { HydrationLogModule } from 'src/modules/hydration/log/log.module'

@Module({
  imports: [HydrationLogModule, HydrationEntryModule],
})
export class HydrationModule {}
