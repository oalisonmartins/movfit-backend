import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DailyNutritionModule } from './modules/daily-nutrition/daily-nutrition.module';
import { WaterIngestionModule } from './modules/water-ingestion/water-ingestion.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DailyNutritionModule,
    WaterIngestionModule,
  ],
})
export class AppModule {}
