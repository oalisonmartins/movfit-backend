import { Body, Controller, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CompleteProfileDto } from '../dtos/complete-profile.dto'
import { CompleteProfileUseCase } from '../use-cases/complete-profile.use-case'

@UseGuards(JwtAuthGuard)
@Controller({ path: '/profile', version: '1' })
export class ProfileController {
  constructor(private readonly completeProfileUseCase: CompleteProfileUseCase) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Complete user profile.',
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  completeOnboarding(@Body() dto: CompleteProfileDto) {
    return this.completeProfileUseCase.execute(dto)
  }
}
