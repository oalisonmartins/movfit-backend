import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, DietGoal, FocusMuscle, Goal, PortionUnit } from 'generated/prisma/enums'

// export class WaterConsumptionDto {
//   @ApiProperty({ type: 'number' })
//   readonly goalInMl: number

//   @ApiProperty({ type: 'number' })
//   readonly consumedInMl: number
// }

// export class WaterConsumptionHistoryDto {
//   @ApiProperty({ type: 'number' })
//   readonly amountInMl: number

//   @ApiProperty({ type: Date })
//   readonly date: Date
// }

// export class DailyNutritionDto {
//   readonly day: Date
//   readonly proteinsInGrams: number
//   readonly carbsInGrams: number
//   readonly fatsInGrams: number
// }

// export class WeightHistoryDto {
//   readonly weightInGrams: number
//   readonly createdAt: Date
// }

// export class WorkoutPlanDto {
//   @ApiProperty({ type: 'string' })
//   readonly name: string
//   @ApiProperty({ type: 'boolean' })
//   readonly isActive: boolean
// }

export class ProfileDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string

  @ApiProperty({ enum: Goal })
  readonly goal: Goal
  @ApiProperty({ enum: BiologicalSex })
  readonly biologicalSex: BiologicalSex
  @ApiProperty({ type: Date })
  readonly birthDate: Date
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly heightInCentimeters: number

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly weightInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly targetWeightInGrams: number

  @ApiProperty({ type: 'string', example: 'America/Sao_Paulo' })
  readonly timezone: string
}

export class WorkoutConfigDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 7 })
  readonly freeDaysPerWeek: number
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 86_399 })
  readonly freeTimeByDayInSeconds: number
  @ApiProperty({ enum: [FocusMuscle], isArray: true, maxItems: 2 })
  readonly focusMuscles: FocusMuscle[]
}

export class FoodDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly foodId: string

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly amount: number
  @ApiProperty({ enum: PortionUnit })
  readonly unit: PortionUnit

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly proteinsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly caloriesInKcal: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly carbsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly fatsInGrams: number
}

export class MealDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'string' })
  readonly name: string
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly timeInMinutes: number

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalProteinsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalCaloriesInKcal: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalCarbsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalFatsInGrams: number

  @ApiProperty({ type: [FoodDTO], isArray: true })
  readonly foods: FoodDTO[]
}

export class DietDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'boolean' })
  readonly isActive: boolean

  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalProteinsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalCaloriesInKcal: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalCarbsInGrams: number
  @ApiProperty({ type: 'integer', minimum: 1 })
  readonly totalFatsInGrams: number

  @ApiProperty({ enum: DietGoal })
  readonly goal: Goal
  @ApiProperty({ type: [MealDTO], isArray: true })
  readonly meals: MealDTO[]
}

export class MeResponseDTO {
  @ApiProperty({ type: 'string', format: 'uuid' })
  readonly id: string
  @ApiProperty({ type: 'string' })
  readonly name: string
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string
  @ApiProperty({ type: ProfileDTO })
  readonly profile: ProfileDTO
  @ApiProperty({ type: WorkoutConfigDTO })
  readonly workoutConfig: WorkoutConfigDTO
}
