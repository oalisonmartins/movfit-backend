import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { CompleteOnboardingInput } from '../types/complete-onboarding.type'

@Injectable()
export class CompleteOnboardingUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: CompleteOnboardingInput): Promise<void> {
    await this.usersRepository.completeOnboarding(input)
  }
}
