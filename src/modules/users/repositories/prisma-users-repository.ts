import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma/client'
import { FindByUserIdInput } from 'src/common/types/find-by-user-id.type'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { CompleteOnboardingInput } from '../types/complete-onboarding.type'
import { CreateUserInput } from '../types/create-user.type'
import { GetByEmailInput } from '../types/get-by-email.type'
import {
  SelectTimezone,
  UserAuth,
  UserSelectOnlyDiets,
  UserWithDietsAndTimezone,
  UserWithProfile,
  UserWithProfileAndWorkoutConfig,
} from '../types/users.type'
import { UsersRepository } from './users-repository'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findWithProfile(input: FindByUserIdInput): Promise<UserWithProfile | null> {
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: { profile: true },
    })
    return userWithProfile
  }

  async getDiets(input: FindByUserIdInput): Promise<UserSelectOnlyDiets | null> {
    const diets = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        diets: {
          include: {
            meals: {
              include: { consumedFoods: true },
            },
          },
        },
      },
    })
    return diets
  }

  async getMe(input: FindByUserIdInput): Promise<UserWithProfileAndWorkoutConfig | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: input.userId },
      include: {
        profile: true,
        workoutConfig: true,
      },
    })
    return user
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.password,
      },
    })
    return user
  }

  async findByEmail(input: GetByEmailInput): Promise<UserAuth | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      include: {
        diets: true,
        profile: true,
        waterConsumptions: true,
      },
    })
    return user
  }

  async findWithTimezone(input: FindByUserIdInput): Promise<SelectTimezone | null> {
    const userTimezone = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        profile: {
          select: { timezone: true },
        },
      },
    })
    return userTimezone
  }

  async findWithDietsAndTimezone(
    input: FindByUserIdInput,
  ): Promise<UserWithDietsAndTimezone | null> {
    const userWithDietsAndTimezone = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        diets: true,
        profile: {
          select: { timezone: true },
        },
      },
    })
    return userWithDietsAndTimezone
  }

  async findById(input: FindByUserIdInput): Promise<UserAuth | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        isOnboardingCompleted: true,
      },
    })
    return user
  }

  async findByEmailForAuth(input: GetByEmailInput): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    })
    return user
  }

  async completeOnboarding(input: CompleteOnboardingInput): Promise<void> {
    await this.prisma.user.update({
      where: { id: input.userId },
      data: {
        isOnboardingCompleted: true,
        profile: {
          create: input,
        },
      },
    })
  }
}
