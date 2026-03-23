import { Injectable } from '@nestjs/common';
import { GetMeDto } from '../dtos/get-me.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class GetMeUseCase {
  async execute(user: User): Promise<GetMeDto> {
    return {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      goal: user.goal,
      biologicalSex: user.biologicalSex,
      weightInGrams: user.weightInGrams,
      heightInCentimeters: user.heightInCentimeters,
      goalWeightInGrams: user.goalWeightInGrams,
    };
  }
}
