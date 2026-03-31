import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'

export type GetMeResponse = {
  name: string
  email: string
  profile: {
    goal: Goal | undefined
    biologicalSex: BiologicalSex | undefined
    birthDate: Date | undefined
    heightInCentimeters: number | undefined
    weightInGrams: number | undefined
    targetWeightInGrams: number | undefined
  }
  workoutConfig: {
    focusMuscles: FocusMuscle[] | undefined
    freeDaysPerWeek: number | undefined
    freeTimeByDayInSeconds: number | undefined
  }
}
