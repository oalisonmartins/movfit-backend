import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import { GetMeOutoutDto } from '../dtos/get-me.dto';

@Injectable()
export class GetMeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(payload: TokenPayloadDto): Promise<GetMeOutoutDto> {
    const user = await this.usersRepository.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Unauthorized.',
        code: 'UNAUTHORIZED_ERROR',
      });
    }

    return {
      name: user.name,
      email: user.email,
      age: user.age,
      weightInGrams: user.weightInGrams,
      heightInCentimeters: user.heightInCentimeters,
      goalWeightInGrams: user.goalWeightInGrams,
    };
  }
}
