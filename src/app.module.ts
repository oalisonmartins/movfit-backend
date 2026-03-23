import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DailyNutritionModule } from './modules/daily-nutrition/daily-nutrition.module'
import { UsersModule } from './modules/users/users.module'
import { WaterIngestionModule } from './modules/water-ingestion/water-ingestion.module'

@Module({
  controllers: [AppController],
  imports: [UsersModule, AuthModule, DailyNutritionModule, WaterIngestionModule],
  providers: [AppService],
})
export class AppModule {}
