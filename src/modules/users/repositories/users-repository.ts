import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';

import { CreateUserInputDto } from '../dtos/create-user.dto';

@Injectable()
export abstract class UsersRepository {
  abstract create(data: CreateUserInputDto);
  abstract updateBodyMetrics();
  abstract delete();
  abstract getByEmail(email: string): Promise<User | null>;
  abstract getById(id: string): Promise<User | null>;
  abstract getAll();
}
