import { ApiProperty } from '@nestjs/swagger'
import { DietGenerationType, DietGoal } from 'generated/prisma/enums'
import { DietsPreference } from 'src/modules/diets/preference/types/diets-preference.types'

export class DietsPreferenceDto implements DietsPreference {
  @ApiProperty({ title: 'ID da preferência', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Objetivo', enum: DietGoal })
  readonly goal: DietGoal

  @ApiProperty({ title: 'Tipo de geração de dieta', enum: DietGenerationType })
  readonly generationType: DietGenerationType

  @ApiProperty({ title: 'Data de criação', type: Date })
  readonly createdAt: Date

  @ApiProperty({ title: 'Data da última atualização', type: Date })
  readonly updatedAt: Date
}
