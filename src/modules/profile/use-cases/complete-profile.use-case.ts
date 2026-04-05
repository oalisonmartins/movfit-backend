import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfileRepository } from '../repositories/profile.repository'
import { CompleteProfileRequest } from '../types/complete-profile.type'

@Injectable()
export class CompleteProfileUseCase {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(input: CompleteProfileRequest): Promise<void> {
    const userId = this.requestContext.getUserId
    await this.profileRepo.completeProfile(userId, input)
  }
}
