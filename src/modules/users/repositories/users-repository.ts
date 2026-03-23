import { Injectable } from '@nestjs/common';
import { BiologicalSex, User, UserGoal } from 'generated/prisma/client';

import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';
import { GetUserMetricsDto } from '../dtos/get-user-metrics.dto';
import { UserGetPayload } from 'generated/prisma/internal/prismaNamespaceBrowser';
import { UserDto, UserDtoPayload } from 'src/modules/users/dtos/user.dto';

export type CreateUserData = {
  name: string;
  email: string;
  birthDate: Date;
  password: string;
};

export type CreateUserResultData = UserGetPayload<{
  omit: {
    passwordHash: true;
    weightInGrams: true;
    goalWeightInGrams: true;
    heightInCentimeters: true;
  };
}>;

export type UpdateMetricsData = {
  goal: UserGoal;
  biologicalSex: BiologicalSex;
  weightInGrams: number;
  goalWeightInGrams: number;
  heightInCentimeters: number;
};

export type UpdateMetricsResultData = UserGetPayload<{
  select: {
    goal: true;
    biologicalSex: true;
    heightInCentimeters: true;
    weightInGrams: true;
    goalWeightInGrams: true;
  };
}>;

export type UserWithPasswordData = UserGetPayload<{
  omit: {
    createdAt: true;
    updatedAt: true;
  };
}>;

@Injectable()
export abstract class UsersRepository {
  abstract create(data: CreateUserData): Promise<CreateUserResultData>;
  abstract updateMetrics(
    userId: string,
    data: UpdateMetricsData,
  ): Promise<UpdateMetricsResultData>;
  abstract getByEmail(email: string): Promise<UserDtoPayload | null>;
  abstract getByEmailWithPassword(
    email: string,
  ): Promise<UserWithPasswordData | null>;
  abstract getById(id: string): Promise<UserDtoPayload | null>;
  abstract getMetrics(userId: string): Promise<GetUserMetricsDto | null>;
}
