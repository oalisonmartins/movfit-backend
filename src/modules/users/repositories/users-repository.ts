import { Injectable } from '@nestjs/common';

import { CreateUserInputDto } from '../dtos/create-user.dto';

@Injectable()
export abstract class UsersRepository {
  abstract create(data: CreateUserInputDto);
  abstract me(userId: string);
  abstract updateBodyMetrics();
  abstract login();
  abstract listAll();
  abstract deleteAccount();
}
