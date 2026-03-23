import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetWaterIngestionUseCase } from '../use-cases/get-water-ingestion.use-case';
import { UpdateWaterIngestionUseCase } from '../use-cases/update-water-ingestion.use-case';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from 'src/modules/auth/decorators/authenticated-user.decorator';
import type { User } from 'generated/prisma/client';

@Controller({
  path: '/water-ingestion',
  version: '4',
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  getWaterIngestion(@AuthenticatedUser() user: User) {
    return this.getWaterIngestionUseCase.execute(user.id);
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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  updateWaterIngestion(@AuthenticatedUser() user: User) {
    return this.updateWaterIngestionUseCase.execute(user.id);
  }
}
