import { IsNotEmpty, IsString } from 'class-validator'
import { RefreshTokensInput } from 'src/modules/auth/types/refresh-tokens.types'

export class RefreshTokensDto implements RefreshTokensInput {
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string
}
