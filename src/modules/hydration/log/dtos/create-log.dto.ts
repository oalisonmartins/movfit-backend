import { ApiProperty } from '@nestjs/swagger'

export class CreateHydrationLogDto {
  @ApiProperty({ title: 'Meta de consumo diário (mL)', type: 'integer' })
  hydrationGoalInMl: number
}
