import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { CreateUserInputDto } from 'src/modules/users/dtos/create-user.dto';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';

import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, age, email, password }: CreateUserInputDto) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        age,
        passwordHash: password,
      },
      omit: {
        passwordHash: true,
        weightInGrams: true,
        goalWeightInGrams: true,
        heightInCentimeters: true,
      },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  updateBodyMetrics(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
