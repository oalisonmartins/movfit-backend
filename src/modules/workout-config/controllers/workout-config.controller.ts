import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { UserDto } from 'src/modules/users/dtos/user.dto'
import { RegisterWorkoutConfigDto } from '../dtos/register-workout-config.dto'
import { GetWorkoutConfigUseCase } from '../use-cases/get-workout-config.use-case'
import { RegisterWorkoutConfigUseCase } from '../use-cases/register-workout-config.use-case'

@UseGuards(JwtAuthGuard)
@Controller({
  path: '/workout-config',
  version: '1',
})
export class WorkoutConfigController {
  constructor(
    private readonly registerWorkoutConfigUseCase: RegisterWorkoutConfigUseCase,
    private readonly getWorkoutConfigUseCase: GetWorkoutConfigUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getWorkoutConfig(@AuthenticatedUser() user: UserDto) {
    return this.getWorkoutConfigUseCase.execute(user.id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerWorkoutConfig(@Body() dto: RegisterWorkoutConfigDto) {
    return this.registerWorkoutConfigUseCase.execute(dto)
  }
}
