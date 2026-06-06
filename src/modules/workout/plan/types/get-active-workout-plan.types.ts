import { WorkoutGoal } from 'generated/prisma/enums'

export type GetActiveWorkoutPlanOutput = {
  id: string
  name: string
  goal: WorkoutGoal
  createdAt: Date
}
