import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginInputDto {
  @IsEmail(undefined, { message: 'Email invalid.' })
  readonly email: string;

  @IsString({ message: 'Invalid password' })
  @MinLength(8, { message: 'Password need to be greater than or equal 8.' })
  readonly password: string;
}

export class LoginOutputDto {
  accessToken: string;
}
