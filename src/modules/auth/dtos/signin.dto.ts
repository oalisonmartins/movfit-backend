import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class SigninRequestDto {
  @ApiProperty({ type: 'string', format: 'email', uniqueItems: true, required: true })
  @IsEmail()
  readonly email: string

  @ApiProperty({ type: 'string', format: 'password', minLength: 8, required: true })
  @IsString()
  @MinLength(8)
  readonly password: string
}

export class SigninResponseDto {
  @ApiProperty({ type: 'string', format: 'password' })
  readonly accessToken: string
}
