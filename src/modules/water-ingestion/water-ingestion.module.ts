import { Module } from '@nestjs/common';
import { WaterIngestionRepository } from './repositories/water-ingestion.repository';
import { PrismaWaterIngestionRepository } from './repositories/prisma-water-ingestion.repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { GetWaterIngestionUseCase } from './use-cases/get-water-ingestion.use-case';
import { UsersModule } from '../users/users.module';
import { WaterIngestionController } from './controllers/water-ingestion.controller';
import { JwtAuthModule } from '../auth/jwt-auth.module';
import { UpdateWaterIngestionUseCase } from './use-cases/update-water-ingestion.use-case';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [WaterIngestionController],
  exports: [WaterIngestionRepository],
  providers: [
    PrismaService,
    GetWaterIngestionUseCase,
    UpdateWaterIngestionUseCase,
    {
      provide: WaterIngestionRepository,
      useClass: PrismaWaterIngestionRepository,
    },
  ],
})
export class WaterIngestionModule {}
