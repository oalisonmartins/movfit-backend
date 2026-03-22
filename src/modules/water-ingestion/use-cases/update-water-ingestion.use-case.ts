import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getUserDailyIngestion } from 'src/modules/water-ingestion/helpers/get-user-daily-ingestion.helper';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { WaterIngestionRepository } from '../repositories/water-ingestion.repository';

@Injectable()
export class UpdateWaterIngestionUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly repository: WaterIngestionRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Unauthorized.',
        code: 'UNAUTHORIZED_ERROR',
      });
    }

    if (
      user.biologicalSex === null ||
      user.goal === null ||
      user.weightInGrams === null
    ) {
      throw new BadRequestException({
        message: 'Complete your profile and try again.',
        code: 'INCOMPLETE_PROFILE',
      });
    }

    const dailyIngestionInMl = getUserDailyIngestion({
      biologicalSex: user.biologicalSex,
      weightInGrams: user.weightInGrams,
      birthDate: user.birthDate,
      goal: user.goal,
    });

    await this.repository.upsertWaterIngestion(userId, dailyIngestionInMl);
  }
}
