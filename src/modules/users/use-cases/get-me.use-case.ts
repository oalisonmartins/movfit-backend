import { Injectable, NotFoundException } from '@nestjs/common'
import { FindByUserIdInput } from 'src/common/types/find-by-user-id.type'
import { UsersRepository } from '../repositories/users-repository'
import { GetMeResponse } from '../types/get-me.type'

@Injectable()
export class GetMeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: FindByUserIdInput): Promise<GetMeResponse> {
    const user = await this.usersRepository.getMe({
      userId: input.userId,
    })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    return {
      email: user.email,
      name: user.name,
      profile: {
        biologicalSex: user.profile?.biologicalSex,
        birthDate: user.profile?.birthDate,
        goal: user.profile?.goal,
        heightInCentimeters: user.profile?.heightInCentimeters,
        targetWeightInGrams: user.profile?.targetWeightInGrams,
        weightInGrams: user.profile?.targetWeightInGrams,
      },
      workoutConfig: {
        focusMuscles: user.workoutConfig?.focusMuscles,
        freeDaysPerWeek: user.workoutConfig?.freeDaysPerWeek,
        freeTimeByDayInSeconds: user.workoutConfig?.freeTimeByDayInSeconds,
      },
    }
  }
}
