import { BiologicalSex, UserGoal } from 'generated/prisma/enums'
export class UserDto {
  waterConsumption: {
    goalInMl: number
    consumedInMl: number
  } | null

  waterConsumptionHistory: {
    amountInMl: number
    date: Date
  }[]

  id: string
  name: string
  email: string
  goal: UserGoal | null
  biologicalSex: BiologicalSex | null
  birthDate: Date
  weightInGrams: number | null
  heightInCentimeters: number | null
  goalWeightInGrams: number | null
}
