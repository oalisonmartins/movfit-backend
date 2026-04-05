import { Injectable } from '@nestjs/common'
import { WorkoutConfig } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  RegisterWorkoutConfigInput,
  RegisterWorkoutConfigOutput,
} from '../types/register-workout-config.type'
import { WorkoutConfigRepository } from './workout-config.repository'

@Injectable()
export class PrismaWorkoutConfigRepository implements WorkoutConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkoutConfig(userId: string): Promise<WorkoutConfig | null> {
    const workoutConfig = await this.prisma.workoutConfig.findFirst({
      where: { userId },
    })

    if (!workoutConfig) {
      return null
    }

    return workoutConfig
  }

  async registerWorkoutConfig(
    userId: string,
    input: RegisterWorkoutConfigInput,
  ): Promise<WorkoutConfig> {
    const newWorkoutConfig = await this.prisma.workoutConfig.create({
      data: {
        userId,
        freeDaysPerWeek: input.freeDaysPerWeek,
        freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
        focusMuscles: input.focusMuscles,
      },
    })
    return newWorkoutConfig
  }
}
