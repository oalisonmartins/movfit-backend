import { ApiProperty } from '@nestjs/swagger'
import { DietGenerationType, DietGoal } from 'generated/prisma/enums'
import { ProfileDto } from 'src/modules/profiles/dtos/profile.dto'
import { WorkoutPreferenceDto } from 'src/modules/workout/preference/dtos/workout-preference.dto'

export class DietPreferenceDto {
  @ApiProperty({
    title: 'ID da preferência alimentar',
    type: 'string',
    format: 'uuid',
  })
  readonly id: string

  @ApiProperty({
    title: 'Objetivo da preferência alimentar',
    enum: DietGoal,
  })
  readonly goal: DietGoal

  @ApiProperty({
    title: 'Tipo de geração de dieta',
    enum: DietGenerationType,
  })
  readonly generationType: DietGenerationType

  @ApiProperty({
    title: 'Data da última atualização do plano alimentar',
    type: Date,
  })
  readonly updatedAt: Date
}

export class MeResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'E-mail', type: 'string', format: 'email' })
  readonly email: string

  @ApiProperty({ title: 'Profile', type: ProfileDto })
  readonly profile: ProfileDto

  @ApiProperty({ title: 'Workout config', type: WorkoutPreferenceDto })
  readonly workoutPreference: WorkoutPreferenceDto

  readonly dietPreference: DietPreferenceDto
}
