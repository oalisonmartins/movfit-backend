import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';

import { CreateUserInputDto } from '../dtos/create-user.dto';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';

@Injectable()
export abstract class UsersRepository {
  abstract create(data: CreateUserInputDto);
  abstract updateMetrics(userId: string, data: UpdateUserMetricsInputDto);
  abstract getByEmail(email: string): Promise<User | null>;
  abstract getById(id: string): Promise<User | null>;
}
