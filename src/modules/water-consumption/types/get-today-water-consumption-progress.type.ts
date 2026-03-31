export type GetTodayWaterConsumptionProgressInput = {
  userId: string
}

export type GetTodayWaterConsumptionProgressOutput = {
  goalDailyConsumptionInMl: number
  todayConsumptionInMl: number
  todayConsumptionInPercentage: number
}
