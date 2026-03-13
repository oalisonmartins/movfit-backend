import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from 'src/modules/users/dtos/create-user.dto';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInputDto) {
    return await this.prisma.user.create({
      data,
      omit: {
        passwordHash: true,
        weightInGrams: true,
        goalWeightInGrams: true,
        heightInCentimeters: true,
      },
    });
  }
  async me(userId: string) {
    return await this.prisma.user.findFirst({
      where: { id: userId },
      omit: {
        passwordHash: true,
      },
    });
  }
  updateBodyMetrics(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  login(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteAccount(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
