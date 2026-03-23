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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator';
import { UserDto } from 'src/modules/users/dtos/user.dto';

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/water-ingestion',
  version: '1',
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
  @HttpCode(HttpStatus.OK)
  getWaterIngestion(@AuthenticatedUser() user: UserDto) {
    return this.getWaterIngestionUseCase.execute(user);
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
  updateWaterIngestion(@AuthenticatedUser() user: UserDto) {
    return this.updateWaterIngestionUseCase.execute(user);
  }
}
