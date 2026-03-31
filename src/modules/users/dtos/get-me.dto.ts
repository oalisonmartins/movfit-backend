import { ApiProperty } from '@nestjs/swagger'
import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'

export class ProfileDto {
  @ApiProperty({ enum: Goal, isArray: true })
  readonly goal: Goal

  @ApiProperty({ enum: BiologicalSex, isArray: true })
  readonly biologicalSex: BiologicalSex

  @ApiProperty({ type: Date })
  readonly birthDate: Date

  @ApiProperty({ type: 'number' })
  readonly heightInCentimeters: number

  @ApiProperty({ type: 'number' })
  readonly weightInGrams: number

  @ApiProperty({ type: 'number' })
  readonly targetWeightInGrams: number
}

export class WaterConsumptionDto {
  @ApiProperty({ type: 'number' })
  readonly goalInMl: number

  @ApiProperty({ type: 'number' })
  readonly consumedInMl: number
}

export class WaterConsumptionHistoryDto {
  @ApiProperty({ type: 'number' })
  readonly amountInMl: number

  @ApiProperty({ type: Date })
  readonly date: Date
}

export class WorkoutConfigDto {
  readonly freeDaysPerWeek: number
  readonly freeTimeByDayInSeconds: number
  readonly focusMuscles: FocusMuscle[]
}

export class DailyNutritionDto {
  readonly day: Date
  readonly proteinsInGrams: number
  readonly carbsInGrams: number
  readonly fatsInGrams: number
}

export class MealFoodDto {
  readonly name: string
  readonly quantity: number
  readonly weightPerUnitInGrams: number
  readonly totalCalories: number
  readonly coverImageUrl: string | null
}

export class DietMealDto {
  readonly timeInMinutes: number
  readonly totalCalories: number
  readonly carbsInGrams: number
  readonly proteinsInGrams: number
  readonly fatsInGrams: number
  readonly consumedFoods: MealFoodDto[]
}

export class DietDto {
  readonly proteinsInGrams: number
  readonly carbsInGrams: number
  readonly fatsInGrams: number
  readonly goal: Goal
  readonly meals: DietMealDto[]
}

export class WeightHistoryDto {
  readonly weightInGrams: number
  readonly createdAt: Date
}

export class WorkoutPlanDto {
  readonly name: string
  readonly isActive: boolean
}

export class GetMeDto {
  readonly name: string
  readonly email: string
  readonly profile: ProfileDto | null
  readonly workoutConfig: WorkoutConfigDto | null
}
