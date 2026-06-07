import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler/dist'
import { RedisModule } from '@nestjs-modules/ioredis'
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { AuthModule } from 'src/modules/auth/auth.module'
import { DietsModule } from 'src/modules/diets/diets.module'
import { FoodsModule } from 'src/modules/foods/foods.module'
import { HydrationModule } from 'src/modules/hydration/hydration.module'
import { NutritionModule } from 'src/modules/nutrition/nutrition.module'
import { OnboardingModule } from 'src/modules/onboarding/onboarding.module'
import { WorkoutModule } from 'src/modules/workout/workout.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { UsersModule } from './modules/users/users.module'

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
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
    UsersModule,
    AuthModule,
    WorkoutModule,
    ProfilesModule,
    DietsModule,
    FoodsModule,
    NutritionModule,
    HydrationModule,
    OnboardingModule,
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
