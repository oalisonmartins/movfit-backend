import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { SigninRequestDto, SigninResponseDto } from '../dtos/signin.dto'
import { SignupRequestDto } from '../dtos/signup.dto'
import { SigninUseCase } from '../use-cases/signin.use-case'
import { SignupUseCase } from '../use-cases/signup.use-case'

@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly signinUseCase: SigninUseCase,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninRequestDto) {
    return this.signinUseCase.execute(dto)
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SigninResponseDto,
  })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDto) {
    return this.signupUseCase.execute(dto)
  }
}
