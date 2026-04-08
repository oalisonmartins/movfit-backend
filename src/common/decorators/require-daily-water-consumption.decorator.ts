import { SetMetadata } from '@nestjs/common'

export const RequireDailyWaterConsumption = () =>
  SetMetadata('REQUIRE_DAILY_WATER_CONSUMPTION', true)
