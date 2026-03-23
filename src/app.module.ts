import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DailyNutritionModule } from './modules/daily-nutrition/daily-nutrition.module'
import { UsersModule } from './modules/users/users.module'
import { WaterConsumptionModule } from './modules/water-consumption/water-consumption.module'

@Module({
  controllers: [AppController],
  imports: [UsersModule, AuthModule, DailyNutritionModule, WaterConsumptionModule],
  providers: [AppService],
})
export class AppModule {}
