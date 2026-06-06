import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, FitnessLevel } from 'generated/prisma/enums'

export class ProfileDto {
  @ApiProperty({
    title: 'ID do perfil',
    type: 'string',
    format: 'uuid ',
  })
  readonly id: string

  @ApiProperty({
    title: 'Peso do usuário (em quilogramas)',
    type: 'integer',
  })
  readonly weightInKg: number

  @ApiProperty({
    title: 'Nível fitness do usuário',
    enum: FitnessLevel,
  })
  readonly fitnessLevel: FitnessLevel

  @ApiProperty({
    title: 'Peso-alvo do usuário (em quilogramas)',
    type: 'integer',
  })
  readonly targetWeightInKg: number

  @ApiProperty({
    title: 'Altura do usuário (em centímetros)',
    type: 'integer',
  })
  readonly heightInCm: number

  @ApiProperty({
    title: 'Sexo biológico do usuário',
    enum: BiologicalSex,
  })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({
    title: 'Timezone do usuário',
    type: 'string',
  })
  readonly timezone: string

  @ApiProperty({
    title: 'Data de nascimento do usuário',
    type: 'string',
  })
  readonly birthDate: string
}
