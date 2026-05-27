import { ApiProperty } from '@nestjs/swagger/dist'

export class AuthResponseDTO {
  @ApiProperty({ title: 'Access token', type: 'string' })
  accessToken: string
}
