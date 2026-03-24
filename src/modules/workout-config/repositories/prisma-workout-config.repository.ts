import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  GetWorkoutConfigResultData,
  RegisterWorkoutConfigData,
  WorkoutConfigData,
  WorkoutConfigRepository,
} from './workout-config.repository'

@Injectable()
export class PrismaWorkoutConfigRepository implements WorkoutConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkoutConfig(userId: string): Promise<GetWorkoutConfigResultData | null> {
    const result = await this.prisma.workoutConfig.findFirst({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            goal: true,
          },
        },
      },
    })

    if (!result) return null

    return {
      id: result.id,
      focusMuscles: result.focusMuscles,
      freeDaysPerWeek: result.freeDaysPerWeek,
      freeTimeByDayInSeconds: result.freeTimeByDayInSeconds,
      goal: result.user.goal,
    }
  }

  async registerWorkoutConfig(data: RegisterWorkoutConfigData): Promise<WorkoutConfigData> {
    const result = await this.prisma.workoutConfig.create({
      data: {
        userId: data.userId,
        freeDaysPerWeek: data.freeDaysPerWeek,
        freeTimeByDayInSeconds: data.freeTimeByDayInSeconds,
        focusMuscles: data.focusMuscles,
      },
    })

    return {
      id: result.id,
      freeDaysPerWeek: result.freeDaysPerWeek,
      freeTimeByDayInSeconds: result.freeTimeByDayInSeconds,
      focusMuscles: result.focusMuscles,
    }
  }
}
