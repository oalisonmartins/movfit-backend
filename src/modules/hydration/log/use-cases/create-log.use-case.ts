import { Injectable } from '@nestjs/common'
import { calculateAge } from 'src/common/helpers'
import { RequestContextService } from 'src/common/services/request-context.service'
import { GoalFactors } from 'src/modules/hydration/log/enums/goal-factors.enum'
import { HydrationLogRepository } from 'src/modules/hydration/log/repositories/log.repository'

@Injectable()
export class CreateHydrationLogUseCase {
  constructor(
    private readonly hydrationLogRepository: HydrationLogRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute() {
    const userId = this.requestContext.getUserId

    const { freeDaysPerWeek, freeTimeByDayInSeconds } = this.requestContext.getWorkoutConfig
    const { weightInKg, goal, biologicalSex, birthDate } = this.requestContext.getProfile

    const activityFactor = this.getActivityFactor(freeDaysPerWeek, freeTimeByDayInSeconds)
    const ageFactor = this.getAgeFactor(birthDate)
    const sexFactor = biologicalSex === 'MALE' ? 1.1 : 1.0

    const dailyGoalInMl = Math.round(weightInKg * GoalFactors[goal] * sexFactor * ageFactor * activityFactor)

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const todayHydrationLog = await this.hydrationLogRepository.findOne(userId, today)

    if (todayHydrationLog) {
      return {
        hydrationGoalInMl: todayHydrationLog.dailyGoalInMl,
      }
    }

    await this.hydrationLogRepository.create(userId, {
      dailyGoalInMl,
      date: today,
    })

    return {
      hydrationGoalInMl: dailyGoalInMl,
    }
  }

  private getActivityFactor(freeDaysPerWeek: number, freeTimeByDayInSeconds: number) {
    const activeDays = freeDaysPerWeek

    const availableMinutes = freeTimeByDayInSeconds / 60
    const isHigh = availableMinutes >= 60
    const isLow = availableMinutes < 30

    if (activeDays >= 6 && isHigh) return 1.3
    if (activeDays >= 5 && isHigh) return 1.2
    if (activeDays >= 4 && !isLow) return 1.15
    if (activeDays >= 3) return 1.1

    return activeDays >= 2 ? 1.05 : 1.0
  }

  private getAgeFactor(birthDate: Date) {
    const age = calculateAge(birthDate)

    if (age > 55) return 0.9
    if (age < 18) return 1.1

    return 1.0
  }
}
