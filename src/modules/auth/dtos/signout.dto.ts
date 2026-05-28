import { IsJWT } from 'class-validator'

export class SignoutDto {
  @IsJWT({ message: 'Insira um token JWT válido' })
  readonly token: string
}
