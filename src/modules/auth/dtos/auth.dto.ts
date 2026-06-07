import { ApiProperty } from '@nestjs/swagger/dist'
import { AuthOutput } from 'src/modules/auth/types/auth.types'

export class AuthResponseDto implements AuthOutput {
  @ApiProperty({ type: 'string' })
  accessToken: string

  @ApiProperty({ type: 'string' })
  refreshToken: string
}
