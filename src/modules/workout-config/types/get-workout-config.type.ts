import { BiologicalSex, FocusMuscle, Goal } from 'generated/prisma/enums'
import { WorkoutConfigGetPayload } from 'generated/prisma/models'

export type GetWorkoutConfigInput = {
  userId: string
}

export type GetWorkoutConfigOutput = WorkoutConfigGetPayload<{
  include: {
    user: {
      select: {
        profile: {
          omit: { createdAt: true; updatedAt: true }
        }
      }
    }
  }
}>

export type GetWorkoutConfigResponse = {
  id: string
  freeDaysPerWeek: number
  freeTimeByDayInSeconds: number
  focusMuscles: FocusMuscle[]
  user: {
    id: string
    profile: {
      id: string
      goal: Goal
      biologicalSex: BiologicalSex
      birthDate: Date
      heightInCentimeters: number
      weightInGrams: number
      targetWeightInGrams: number
      timezone: string
    }
  }
}
