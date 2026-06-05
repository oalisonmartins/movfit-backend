import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, EmphasizedMuscle } from 'generated/prisma/enums'
export class ProfileDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Biological sex', enum: BiologicalSex })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ title: 'Birth date', type: 'string', format: 'date' })
  readonly birthDate: string

  @ApiProperty({ title: 'Height (cm)', type: 'integer', minimum: 1 })
  readonly heightInCm: number

  @ApiProperty({ title: 'Weight (g)', type: 'integer', minimum: 1 })
  readonly weightInGrams: number

  @ApiProperty({ title: 'Target weight (g)', type: 'integer', minimum: 1 })
  readonly targetWeightInGrams: number

  @ApiProperty({ title: 'Timezone', type: 'string', example: 'America/Sao_Paulo' })
  readonly timezone: string
}

export class WorkoutPreferenceDto {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Free days per week', type: 'integer', minimum: 1, maximum: 7 })
  readonly availableDaysPerWeek: number

  @ApiProperty({ title: 'Free time by day (s)', type: 'integer', minimum: 1, maximum: 86_399 })
  readonly availableTimePerDayInSeconds: number

  @ApiProperty({
    title: 'Focus muscles (2 max)',
    enum: [EmphasizedMuscle],
    isArray: true,
    maxItems: 2,
  })
  readonly emphasizedMuscles: EmphasizedMuscle[]
}

export class FoodDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Original food ID', type: 'string', format: 'uuid' })
  readonly foodId: string

  @ApiProperty({ title: 'Portion amount (qty)', type: 'integer', minimum: 1 })
  readonly amount: number

  @ApiProperty({ title: 'Amount (g)', type: 'number' })
  readonly amountInGrams: number

  @ApiProperty({ title: 'Proteins (g)', type: 'integer', minimum: 1 })
  readonly proteinsInGrams: number

  @ApiProperty({ title: 'Calories (kcal)', type: 'integer', minimum: 1 })
  readonly caloriesInKcal: number

  @ApiProperty({ title: 'Carbohydrates (g)', type: 'integer', minimum: 1 })
  readonly carbsInGrams: number

  @ApiProperty({ title: 'Fats (g)', type: 'integer', minimum: 1 })
  readonly fatsInGrams: number
}

export class MealDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'Meal time (min)', type: 'integer', minimum: 1 })
  readonly timeInMinutes: number

  @ApiProperty({ title: 'Total proteins (g)', type: 'integer', minimum: 1 })
  readonly totalProteinsInGrams: number

  @ApiProperty({ title: 'Total calories (kcal)', type: 'integer', minimum: 1 })
  readonly totalCaloriesInKcal: number

  @ApiProperty({ title: 'Total carbohydrates (g)', type: 'integer', minimum: 1 })
  readonly totalCarbsInGrams: number

  @ApiProperty({ title: 'Total fats (g)', type: 'integer', minimum: 1 })
  readonly totalFatsInGrams: number

  @ApiProperty({ title: 'Foods', type: [FoodDTO], isArray: true })
  readonly foods: FoodDTO[]
}

export class DietDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Is active?', type: 'boolean' })
  readonly isActive: boolean

  @ApiProperty({ title: 'Total proteins (g)', type: 'integer', minimum: 1 })
  readonly totalProteinsInGrams: number

  @ApiProperty({ title: 'Total calories (kcal)', type: 'integer', minimum: 1 })
  readonly totalCaloriesInKcal: number

  @ApiProperty({ title: 'Total carbohydrates (g)', type: 'integer', minimum: 1 })
  readonly totalCarbsInGrams: number

  @ApiProperty({ title: 'Total fats (g)', type: 'integer', minimum: 1 })
  readonly totalFatsInGrams: number

  @ApiProperty({ title: 'Meals', type: [MealDTO], isArray: true })
  readonly meals: MealDTO[]
}

export class MeResponseDTO {
  @ApiProperty({ title: 'ID', type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ title: 'Name', type: 'string' })
  readonly name: string

  @ApiProperty({ title: 'E-mail', type: 'string', format: 'email' })
  readonly email: string

  @ApiProperty({ title: 'Profile', type: ProfileDTO })
  readonly profile: ProfileDTO

  @ApiProperty({ title: 'Workout config', type: WorkoutPreferenceDto })
  readonly workoutPreference: WorkoutPreferenceDto
}
