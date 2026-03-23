import { BadRequestException, Injectable } from '@nestjs/common';
import { WaterIngestionRepository } from '../repositories/water-ingestion.repository';
import { getUserDailyIngestion } from 'src/modules/water-ingestion/helpers/get-user-daily-ingestion.helper';
import { GetWaterIngestionDto } from '../dtos/get-ingestion.dto';
import { UserDto } from 'src/modules/users/dtos/user.dto';

@Injectable()
export class GetWaterIngestionUseCase {
  constructor(private readonly repository: WaterIngestionRepository) {}

  async execute(user: UserDto): Promise<GetWaterIngestionDto> {
    const waterIngestion = await this.repository.getWaterIngestion(user.id);

    if (waterIngestion) {
      return waterIngestion;
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
      weightInGrams: user.weightInGrams,
      goal: user.goal,
      biologicalSex: user.biologicalSex,
      birthDate: user.birthDate,
    });

    return await this.repository.upsertWaterIngestion(
      user.id,
      dailyIngestionInMl,
    );
  }
}
