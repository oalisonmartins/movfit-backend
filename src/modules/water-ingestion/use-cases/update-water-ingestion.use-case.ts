import { BadRequestException, Injectable } from '@nestjs/common';
import { getUserDailyIngestion } from 'src/modules/water-ingestion/helpers/get-user-daily-ingestion.helper';
import { WaterIngestionRepository } from '../repositories/water-ingestion.repository';
import { UserDto } from 'src/modules/users/dtos/user.dto';

@Injectable()
export class UpdateWaterIngestionUseCase {
  constructor(private readonly repository: WaterIngestionRepository) {}

  async execute(user: UserDto) {
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

    return await this.repository.upsertWaterIngestion(
      user.id,
      dailyIngestionInMl,
    );
  }
}
