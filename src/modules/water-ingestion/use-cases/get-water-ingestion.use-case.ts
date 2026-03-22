import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WaterIngestionRepository } from '../repositories/water-ingestion.repository';
import { getUserDailyIngestion } from 'src/modules/water-ingestion/helpers/get-user-daily-ingestion.helper';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { GetWaterIngestionDto } from '../dtos/get-ingestion.dto';

@Injectable()
export class GetWaterIngestionUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly repository: WaterIngestionRepository,
  ) {}

  async execute(userId: string): Promise<GetWaterIngestionDto> {
    const waterIngestion = await this.repository.getWaterIngestion(userId);

    if (waterIngestion) {
      return waterIngestion;
    }

    const user = await this.usersRepository.getMetrics(userId);

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
      weightInGrams: user.weightInGrams,
      goal: user.goal,
      biologicalSex: user.biologicalSex,
      birthDate: user.birthDate,
    });

    return await this.repository.upsertWaterIngestion(
      userId,
      dailyIngestionInMl,
    );
  }
}
