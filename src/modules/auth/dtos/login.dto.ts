import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginInputDto {
  @ApiProperty({ example: 'john@doe.tech', required: true })
  @IsEmail(undefined, { message: 'Email invalid.' })
  readonly email: string;

  @ApiProperty({ example: '12345678', required: true })
  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password need to be greater than or equal 8.' })
  readonly password: string;
}

export class LoginOutputDto {
  accessToken: string;
}
