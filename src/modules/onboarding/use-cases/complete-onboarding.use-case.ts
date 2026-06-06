import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { UsersRepository } from 'src/modules/users/repositories/users-repository'

@Injectable()
export class CompleteOnboardingUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute() {
    const userId = this.requestContext.getUserId
    await this.usersRepository.update(userId, { hasCompletedOnboarding: true })
  }
}
