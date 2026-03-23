import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';
import { UpdateUserMetricsInputDto } from '../dtos/update-user-metrics.dto';
import { RequestContextService } from 'src/common/services/request-context.service';

@Injectable()
export class UpdateUserMetricsUseCase {
  constructor(
    private readonly repository: UsersRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(data: UpdateUserMetricsInputDto) {
    const userId = this.requestContext.getUserId;
    return await this.repository.updateMetrics(userId, data);
  }
}
