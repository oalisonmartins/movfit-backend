import { Controller, Get, HttpCode, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { RequireProfile } from 'src/common/decorators/require-profile.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { ProfileInterceptor } from 'src/common/interceptors/profile.interceptor'
import { GetMeDto } from '../dtos/get-me.dto'
import { GetMeUseCase } from '../use-cases/get-me.use-case'

@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: '/users', version: '1' })
export class UsersController {
  constructor(private readonly getMeUseCase: GetMeUseCase) {}

  @RequireProfile()
  @UseInterceptors(ProfileInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user details.',
    type: GetMeDto,
  })
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  getMe() {
    return this.getMeUseCase.execute()
  }
}
