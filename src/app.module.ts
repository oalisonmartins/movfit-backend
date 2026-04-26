import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler/dist'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DailyNutritionModule } from './modules/daily-nutrition/daily-nutrition.module'
import { DailyWaterConsumptionModule } from './modules/daily-water-consumption/daily-water-consumption.module'
import { DietsModule } from './modules/diets/diets.module'
import { FoodsModule } from './modules/foods/foods.module'
import { ProfileModule } from './modules/profile/profile.module'
import { UsersModule } from './modules/users/users.module'
import { WaterConsumptionHistoryModule } from './modules/water-consumption/water-consumption.module'
import { WorkoutConfigModule } from './modules/workout-config/workout-config.module'

@Module({
  controllers: [AppController],
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 60,
        blockDuration: 5000,
      },
      {
        name: 'auth',
        ttl: 60000,
        limit: 5,
        blockDuration: 30000,
      },
      {
        name: 'heavy',
        ttl: 60000,
        limit: 5,
        blockDuration: 15000,
      },
      {
        name: 'reports',
        ttl: 60000,
        limit: 10,
        blockDuration: 10000,
      },
    ]),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    DailyNutritionModule,
    DailyWaterConsumptionModule,
    WaterConsumptionHistoryModule,
    WorkoutConfigModule,
    ProfileModule,
    DietsModule,
    FoodsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
