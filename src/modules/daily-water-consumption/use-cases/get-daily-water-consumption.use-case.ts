import { Injectable } from '@nestjs/common'
import { Goal } from 'generated/prisma/enums'
import { RequestContextService } from 'src/common/services/request-context.service'
import { DailyWaterConsumptionRepository } from '../repositories/daily-water-consumption.repository'

@Injectable()
export class GetDailyWaterConsumptionUseCase {
  private readonly goalFactors: Record<Goal, number> = {
    LOSE_WEIGHT: 40,
    GAIN_MASS: 40,
    DEFINE: 38,
    MAINTAIN_WEIGHT: 35,
  }

  constructor(
    private readonly requestContext: RequestContextService,
    private readonly dailyWaterConsumptionRepo: DailyWaterConsumptionRepository,
  ) {}

  async execute() {
    const userId = this.requestContext.getUserId
    const { freeDaysPerWeek, freeTimeByDayInSeconds } = this.requestContext.getWorkoutConfig
    const { weightInGrams, goal, biologicalSex, birthDate } = this.requestContext.getProfile

    const activityFactor = this.getActivityFactor(freeDaysPerWeek, freeTimeByDayInSeconds)
    const ageFactor = this.getAgeFactor(birthDate)
    const weightInKg = weightInGrams / 1000
    const biologicalSexFactor = biologicalSex === 'MALE' ? 1.1 : 1.0

    const consumptionTargetInMl = Math.round(
      weightInKg * this.goalFactors[goal] * biologicalSexFactor * ageFactor * activityFactor,
    )

    const dailyWaterConsumption = await this.dailyWaterConsumptionRepo.upsert(userId, {
      consumptionTargetInMl,
      totalConsumedInMl: 0,
    })

    return {
      consumptionTargetInMl: dailyWaterConsumption.targetInMl,
    }
  }

  private getActivityFactor(freeDaysPerWeek: number, restInSeconds: number): number {
    const activeDays = 7 - freeDaysPerWeek
    const isHigh = restInSeconds <= 45
    const isLow = restInSeconds > 90

    if (activeDays >= 6 && isHigh) return 1.3
    if (activeDays >= 5 && isHigh) return 1.2
    if (activeDays >= 4 && !isLow) return 1.15
    if (activeDays >= 3) return 1.1

    return activeDays >= 2 ? 1.05 : 1.0
  }

  private getAgeFactor(birthDate: Date): number {
    const today = new Date()
    const age = this.calculateAge(today, birthDate)

    if (age > 55) return 0.9
    if (age < 18) return 1.1

    return 1.0
  }

  private calculateAge(today: Date, birthDate: Date): number {
    let yearBasedAge = today.getFullYear() - birthDate.getFullYear()

    const birthMonth = birthDate.getMonth()
    const isCurrentMonth = today.getMonth() === birthMonth
    const hasBirthdayOccurred =
      today.getMonth() > birthMonth || (isCurrentMonth && today.getDate() >= birthDate.getDate())

    if (!hasBirthdayOccurred) yearBasedAge--

    return yearBasedAge
  }
}
