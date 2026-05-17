import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler/dist'
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { InterceptorsFilter } from 'src/common/filters/interceptors.filter'
import { AuthModule } from 'src/modules/auth/auth.module'
import { DailyNutritionModule } from 'src/modules/daily-nutrition/daily-nutrition.module'
import { DailyWaterConsumptionModule } from 'src/modules/daily-water-consumption/daily-water-consumption.module'
import { DietsModule } from 'src/modules/diets/diets.module'
import { FoodsModule } from 'src/modules/foods/foods.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
    ConfigModule.forRoot({ isGlobal: true }),
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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InterceptorsFilter,
    },
  ],
})
export class AppModule {}
