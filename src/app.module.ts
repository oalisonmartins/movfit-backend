import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler/dist'
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { AuthModule } from 'src/modules/auth/auth.module'
import { DailyWaterConsumptionModule } from 'src/modules/daily-water-consumption/daily-water-consumption.module'
import { DietsModule } from 'src/modules/diets/diets.module'
import { FoodsModule } from 'src/modules/foods/foods.module'
import { HydrationModule } from 'src/modules/hydration/hydration.module'
import { NutritionModule } from 'src/modules/nutritions/nutrition.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProfilesModule } from './modules/profiles/profiles.module'
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DailyWaterConsumptionModule,
    WaterConsumptionHistoryModule,
    WorkoutConfigModule,
    ProfilesModule,
    DietsModule,
    FoodsModule,
    NutritionModule,
    HydrationModule,
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
  ],
})
export class AppModule {}
