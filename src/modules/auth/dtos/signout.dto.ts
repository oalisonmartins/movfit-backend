import { IsJWT } from 'class-validator'
import { SignoutInput } from 'src/modules/auth/types/signout.types'

export class SignoutDto implements SignoutInput {
  @IsJWT({ message: 'Insira um accessToken válido' })
  readonly accessToken: string

  @IsJWT({ message: 'Insira um refreshToken válido' })
  readonly refreshToken: string
}
