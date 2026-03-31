import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { GetWorkoutConfigInput, GetWorkoutConfigOutput } from '../types/get-workout-config.type'
import {
  RegisterWorkoutConfigInput,
  RegisterWorkoutConfigOutput,
} from '../types/register-workout-config.type'
import { WorkoutConfigRepository } from './workout-config.repository'

@Injectable()
export class PrismaWorkoutConfigRepository implements WorkoutConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkoutConfig(input: GetWorkoutConfigInput): Promise<GetWorkoutConfigOutput | null> {
    const workoutConfig = await this.prisma.workoutConfig.findFirst({
      where: { userId: input.userId },
      include: {
        user: {
          select: {
            profile: {
              omit: { createdAt: true, updatedAt: true },
            },
          },
        },
      },
    })
    return workoutConfig
  }

  async registerWorkoutConfig(
    input: RegisterWorkoutConfigInput,
  ): Promise<RegisterWorkoutConfigOutput> {
    const workoutConfig = await this.prisma.workoutConfig.create({
      data: {
        userId: input.userId,
        freeDaysPerWeek: input.freeDaysPerWeek,
        freeTimeByDayInSeconds: input.freeTimeByDayInSeconds,
        focusMuscles: input.focusMuscles,
      },
      select: {
        id: true,
        freeDaysPerWeek: true,
        freeTimeByDayInSeconds: true,
        focusMuscles: true,
      },
    })
    return workoutConfig
  }
}
