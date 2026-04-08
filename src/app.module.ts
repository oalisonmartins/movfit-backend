import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DailyNutritionModule } from './modules/daily-nutrition/daily-nutrition.module'
import { DailyWaterConsumptionModule } from './modules/daily-water-consumption/daily-water-consumption.module'
import { DietsModule } from './modules/diets/diets.module'
import { ProfileModule } from './modules/profile/profile.module'
import { UsersModule } from './modules/users/users.module'
import { WaterConsumptionHistoryModule } from './modules/water-consumption/water-consumption.module'
import { WorkoutConfigModule } from './modules/workout-config/workout-config.module'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    DailyNutritionModule,
    DailyWaterConsumptionModule,
    WaterConsumptionHistoryModule,
    WorkoutConfigModule,
    ProfileModule,
    DietsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
