import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler/dist'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { OnboardingGuard } from 'src/common/guards/onboarding.guard'
import { AuthResponseDto } from 'src/modules/auth/dtos/auth.dto'
import { RefreshTokensDto } from 'src/modules/auth/dtos/refresh-tokens.dto'
import { SigninDTO } from 'src/modules/auth/dtos/signin.dto'
import { SignoutDto } from 'src/modules/auth/dtos/signout.dto'
import { SignupDTO } from 'src/modules/auth/dtos/signup.dto'
import { RefreshTokensUseCase } from 'src/modules/auth/use-cases/refresh-tokens.use-case'
import { SigninUseCase } from 'src/modules/auth/use-cases/signin.use-case'
import { SignoutUseCase } from 'src/modules/auth/use-cases/signout.use-case'
import { SignupUseCase } from 'src/modules/auth/use-cases/signup.use-case'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly signupUseCase: SignupUseCase,
    private readonly signoutUseCase: SignoutUseCase,
    private readonly refreshTokensUseCase: RefreshTokensUseCase,
  ) {}

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  async signin(@Body() body: SigninDTO) {
    return this.signinUseCase.execute(body)
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() body: SignupDTO) {
    return this.signupUseCase.execute(body)
  }

  @UseGuards(JwtAuthGuard, OnboardingGuard)
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('signout')
  async signout(@Body() body: SignoutDto) {
    return this.signoutUseCase.execute(body)
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @Post('refresh')
  refreshTokens(@Body() body: RefreshTokensDto) {
    return this.refreshTokensUseCase.execute(body)
  }
}
