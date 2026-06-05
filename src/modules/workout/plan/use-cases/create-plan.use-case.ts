import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { WeekDay } from 'generated/prisma/enums'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { CreateWorkoutPlanInput } from 'src/modules/workout/plan/types/create-plan.types'
import { WorkoutPlanRepository } from '../repositories/plan.repository'

@Injectable()
export class CreateWorkoutPlanUseCase {
  constructor(
    private readonly workoutPlanRepository: WorkoutPlanRepository,
    private readonly requestContext: RequestContextService,
    private readonly transactionService: TransactionService,
  ) {}

  async execute(input: CreateWorkoutPlanInput) {
    const userId = this.requestContext.getUserId
    const { freeDaysPerWeek, freeTimeByDayInSeconds, goal } = this.requestContext.getWorkoutConfig

    const activeWorkoutPlan = await this.workoutPlanRepository.findOne(userId, true)

    const restDays = input.workoutDays.filter((workoutDay) => workoutDay.isRest)
    const workoutDays = input.workoutDays.filter((workoutDay) => !workoutDay.isRest)

    if (workoutDays.length - restDays.length > freeDaysPerWeek) {
      throw new HttpException(
        {
          message: 'Dias de treino inválidos, diminua a quantidade de treinos na semana',
          code: 'INVALID_WORKOUT_DAYS',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const totalWorkoutTimePerDayInSeconds = input.workoutDays.reduce(
      (totalWorkoutTimePerDay, current) => {
        totalWorkoutTimePerDay[current.weekDay] += current.estimatedDurationInSeconds
        return totalWorkoutTimePerDay
      },
      {} as Record<WeekDay, number>,
    )

    return await this.transactionService.run(async (tx) => {
      if (activeWorkoutPlan) {
        await tx.workoutPlan.update({
          where: { userId, id: activeWorkoutPlan.id },
          data: { isActive: false },
        })
      }

      if (input.goal !== goal) {
        await tx.workoutConfig.update({
          where: { userId },
          data: { goal: input.goal },
        })
      }

      for (const workoutDay of input.workoutDays) {
        if (totalWorkoutTimePerDayInSeconds[workoutDay.weekDay] > freeTimeByDayInSeconds) {
          throw new HttpException(
            {
              message: `Treino: ${workoutDay.name} muito longo. Diminua o tempo do treino ou atualize suas preferências de treino`,
              code: 'WORKOUT_TOO_LONG',
            },
            HttpStatus.BAD_REQUEST,
          )
        }

        if (
          workoutDay.isRest &&
          (workoutDay.exercises.length || workoutDay.estimatedDurationInSeconds > 0)
        ) {
          throw new HttpException(
            {
              message: 'Você não pode ter exercícios para serem treinados em dias de descanso',
              code: 'INVALID_REST_DAY',
            },
            HttpStatus.BAD_REQUEST,
          )
        }
      }

      const newWorkoutPlan = await tx.workoutPlan.create({
        data: {
          userId,
          name: input.name,
          goal: input.goal,
          isActive: true,
          workoutDays: {
            create: input.workoutDays.map((day) => ({
              name: day.name,
              weekDay: day.weekDay,
              estimatedDurationInSeconds: day.estimatedDurationInSeconds,
              coverImageUrl: day.coverImageUrl,
              isRest: day.isRest,
              exercises: {
                create: day.exercises.map((exercise) => ({
                  name: exercise.name,
                  order: exercise.order,
                  reps: exercise.reps,
                  sets: exercise.sets,
                  restTimeInSeconds: exercise.restTimeInSeconds,
                })),
              },
            })),
          },
        },
      })

      return newWorkoutPlan
    })
  }
}
