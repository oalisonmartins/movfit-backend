import { IsEmail, IsStrongPassword } from 'class-validator'
import { Match } from 'src/modules/auth/decorators/match.decorator'

export class SigninDTO {
  @IsEmail(
    {
      allow_underscores: true,
      domain_specific_validation: true,
    },
    {
      message: 'E-mail inválido',
    },
  )
  readonly email: string

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Insira uma senha forte',
    },
  )
  readonly password: string

  @Match('password', {
    message: 'As senhas não coincidem',
  })
  readonly confirmPassword: string
}
