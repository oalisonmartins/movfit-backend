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

    const workoutPreference = this.requestContext.getWorkoutPreference
    const dietPreference = this.requestContext.getDietPreference
    const profile = this.requestContext.getProfile

    const activityFactor = this.getActivityFactor(
      workoutPreference.availableDaysPerWeek,
      workoutPreference.availableTimePerDayInSeconds,
    )
    const ageFactor = this.getAgeFactor(profile.birthDate)
    const sexFactor = profile.biologicalSex === 'MALE' ? 1.1 : 1.0

    const dailyGoalInMl = Math.round(
      profile.weightInKg *
        GoalFactors[dietPreference.goal] *
        sexFactor *
        ageFactor *
        activityFactor,
    )

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const todayHydrationLog = await this.hydrationLogRepository.findOne(userId, today)

    if (todayHydrationLog) {
      return { hydrationGoalInMl: todayHydrationLog.dailyGoalInMl }
    }

    await this.hydrationLogRepository.create(userId, {
      dailyGoalInMl,
      date: today,
    })

    return { hydrationGoalInMl: dailyGoalInMl }
  }

  private getActivityFactor(availableDaysPerWeek: number, availableTimePerDayInSeconds: number) {
    const activityDays = availableDaysPerWeek

    const availableTimePerDayInMinutes = availableTimePerDayInSeconds / 60
    const isHigh = availableTimePerDayInMinutes >= 60
    const isLow = availableTimePerDayInMinutes < 30

    if (activityDays >= 6 && isHigh) return 1.3
    if (activityDays >= 5 && isHigh) return 1.2
    if (activityDays >= 4 && !isLow) return 1.15
    if (activityDays >= 3) return 1.1

    return activityDays >= 2 ? 1.05 : 1.0
  }

  private getAgeFactor(birthDate: Date) {
    const age = calculateAge(birthDate)

    if (age > 55) return 0.9
    if (age < 18) return 1.1

    return 1.0
  }
}
