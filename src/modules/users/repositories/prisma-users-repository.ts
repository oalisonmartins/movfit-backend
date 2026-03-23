import { Injectable } from '@nestjs/common'
import { UserInclude, UserOmit, UserWhereUniqueInput } from 'generated/prisma/models'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import {
  CreateUserData,
  CreateUserResultData,
  UpdateMetricsData,
  UpdateMetricsResultData,
  UsersRepository,
  UserWithPasswordData,
} from 'src/modules/users/repositories/users-repository'
import { GetUserMetricsDto } from '../dtos/get-user-metrics.dto'
import { UserDto } from '../dtos/user.dto'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly publicUserFields = {
    passwordHash: true,
    createdAt: true,
    updatedAt: true,
  } satisfies UserOmit

  private readonly authUserFields = {
    createdAt: true,
    updatedAt: true,
  } satisfies UserOmit

  private readonly userRelations = {
    waterConsumptionHistory: true,
    waterConsumption: true,
  } satisfies UserInclude

  private findUserBy(where: UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
      omit: this.publicUserFields,
      include: this.userRelations,
    })
  }

  async create(data: CreateUserData): Promise<CreateUserResultData> {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        birthDate: data.birthDate,
        passwordHash: data.password,
      },
      omit: {
        passwordHash: true,
        weightInGrams: true,
        goalWeightInGrams: true,
        heightInCentimeters: true,
      },
    })
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    return this.findUserBy({ email })
  }

  async getById(id: string): Promise<UserDto | null> {
    return this.findUserBy({ id })
  }

  async getByEmailForAuth(email: string): Promise<UserWithPasswordData | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      omit: this.authUserFields,
    })
  }

  async updateMetrics(userId: string, data: UpdateMetricsData): Promise<UpdateMetricsResultData> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        goal: data.goal,
        biologicalSex: data.biologicalSex,
        heightInCentimeters: data.heightInCentimeters,
        weightInGrams: data.weightInGrams,
        goalWeightInGrams: data.goalWeightInGrams,
      },
      select: {
        goal: true,
        biologicalSex: true,
        heightInCentimeters: true,
        weightInGrams: true,
        goalWeightInGrams: true,
      },
    })
  }

  async getMetrics(userId: string): Promise<GetUserMetricsDto | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        birthDate: true,
        biologicalSex: true,
        goal: true,
        heightInCentimeters: true,
        weightInGrams: true,
      },
    })
  }
}
