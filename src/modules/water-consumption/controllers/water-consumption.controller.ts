import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { RegisterWaterConsumptionDto } from '../dtos/register-water-consumption.dto'
import { GetWaterConsumptionProgressUseCase } from '../use-cases/get-water-consumption-progress.use-case'
import { RegisterWaterConsumptionUseCase } from '../use-cases/register-water-consumption.use-case'

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/water-consumption',
  version: '1',
})
export class WaterConsumptionController {
  constructor(
    private readonly getWaterConsumptionProgressUseCase: GetWaterConsumptionProgressUseCase,
    private readonly registerWaterConsumptionUseCase: RegisterWaterConsumptionUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'GetWaterConsumptionProgress',
    schema: {
      type: 'object',
      properties: {
        goalDailyConsumptionInMl: { type: 'number' },
        todayConsumptionInMl: { type: 'number' },
        todayConsumptionInPercentage: { type: 'number' },
      },
    },
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getWaterConsumptionProgress() {
    return this.getWaterConsumptionProgressUseCase.execute()
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'UpdateWaterConsumption',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  updateWaterConsumption(@Body() dto: RegisterWaterConsumptionDto) {
    return this.registerWaterConsumptionUseCase.execute(dto)
  }
}
