import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateUserInputDto {
  @ApiProperty({ example: 'John Doe', required: true })
  @IsString({ message: 'Invalid name.' })
  name: string;

  @ApiProperty({ example: 'john@doe.tech', required: true })
  @IsEmail(undefined, { message: 'Invalid email.' })
  email: string;

  @ApiProperty({ example: '12345678', required: true })
  @IsString({ message: 'Invalid password.' })
  @MinLength(8, { message: 'Leak password.' })
  password: string;

  @ApiProperty({ example: 'DD/MM/YYYY', required: true })
  @IsDate({ message: 'Invalid age.' })
  @Type(() => Date)
  birthDate: Date;
}
