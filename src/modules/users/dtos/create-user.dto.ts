import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
  @IsString({ message: 'Invalid name.' })
  name: string;

  @IsEmail(undefined, { message: 'Invalid email.' })
  email: string;

  @IsString({ message: 'Invalid password.' })
  @MinLength(8, { message: 'Leak password.' })
  password: string;

  @IsDate({ message: 'Invalid age.' })
  @Type(() => Date)
  birthDate: Date;
}
