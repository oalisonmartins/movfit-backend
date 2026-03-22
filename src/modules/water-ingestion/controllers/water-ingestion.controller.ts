import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetWaterIngestionUseCase } from '../use-cases/get-water-ingestion.use-case';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import type { FastifyRequest } from 'fastify';
import { PAYLOAD_KEY } from 'src/modules/auth/constants/auth.constant';
import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';
import { UpdateWaterIngestionUseCase } from '../use-cases/update-water-ingestion.use-case';

@Controller('/water-ingestion')
export class WaterIngestionController {
  constructor(
    private readonly getWaterIngestionUseCase: GetWaterIngestionUseCase,
    private readonly updateWaterIngestionUseCase: UpdateWaterIngestionUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getWaterIngestion(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getWaterIngestionUseCase.execute(payload.sub);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  updateWaterIngestion(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateWaterIngestionUseCase.execute(payload.sub);
  }
}
