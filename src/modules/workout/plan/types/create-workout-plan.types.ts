import { WeekDay, WorkoutGoal } from 'generated/prisma/enums'

export type CreateWorkoutPlanInput = {
  name: string
  goal: WorkoutGoal
  workoutDays: {
    name: string
    isRest: boolean
    estimatedDurationInSeconds: number
    coverImageUrl?: string
    weekDay: WeekDay
    exercises: {
      name: string
      order: number
      reps: number
      sets: number
      restTimeInSeconds: number
    }[]
  }[]
}
