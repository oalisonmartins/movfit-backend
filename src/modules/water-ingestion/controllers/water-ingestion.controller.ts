import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiResponse } from '@nestjs/swagger';

@Controller({
  path: '/water-ingestion',
  version: '3',
})
export class WaterIngestionController {
  constructor(
    private readonly getWaterIngestionUseCase: GetWaterIngestionUseCase,
    private readonly updateWaterIngestionUseCase: UpdateWaterIngestionUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'GetWaterIngestion',
    schema: {
      type: 'object',
      properties: {
        goalInMl: { type: 'number' },
        consumedInMl: { type: 'number' },
      },
    },
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getWaterIngestion(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.getWaterIngestionUseCase.execute(payload.sub);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'UpdateWaterIngestion',
    schema: {
      type: 'object',
      properties: {
        goalInMl: { type: 'number' },
        consumedInMl: { type: 'number' },
      },
    },
  })
  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  updateWaterIngestion(@Req() req: FastifyRequest) {
    const payload: TokenPayloadDto = req[PAYLOAD_KEY];
    return this.updateWaterIngestionUseCase.execute(payload.sub);
  }
}
