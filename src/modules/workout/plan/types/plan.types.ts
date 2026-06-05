import { WorkoutGoal } from 'generated/prisma/enums'

export type ActiveWorkoutPlan = {
  id: string
  name: string
  goal: WorkoutGoal
  createdAt: Date
}
