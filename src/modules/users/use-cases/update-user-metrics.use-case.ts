import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';

@Injectable()
export class UpdateUserMetricsUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, data: UpdateUserMetricsInputDto) {
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Unauthorized.',
        code: 'UNAUTHORIZED_ERROR',
      });
    }

    return await this.usersRepository.updateMetrics(user.id, data);
  }
}
