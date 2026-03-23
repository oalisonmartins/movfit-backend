import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class GetMeUseCase {
  async execute(user: UserDto): Promise<UserDto> {
    return user;
  }
}
