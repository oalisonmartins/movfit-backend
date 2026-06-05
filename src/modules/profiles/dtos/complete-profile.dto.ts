import { ApiProperty } from '@nestjs/swagger/dist'
import { IsDate, IsEnum, IsInt, IsString, IsTimeZone } from 'class-validator'
import { BiologicalSex, FitnessLevel } from 'generated/prisma/enums'
import { TransformDate } from 'src/common/decorators/transform-date.decorator'

export class CompleteProfileRequestDTO {
  @IsEnum(BiologicalSex)
  readonly biologicalSex: BiologicalSex

  @IsDate()
  @TransformDate()
  readonly birthDate: Date

  @IsEnum(FitnessLevel)
  readonly fitnessLevel: FitnessLevel

  @IsInt()
  readonly heightInCm: number

  @IsInt()
  readonly weightInKg: number

  @IsInt()
  readonly targetWeightInKg: number

  @IsTimeZone()
  @IsString()
  readonly timezone: string
}

export class CompleteProfileResponseDTO {
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
