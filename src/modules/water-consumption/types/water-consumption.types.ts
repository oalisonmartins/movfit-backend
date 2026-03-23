export type UpsertWaterConsumptionInputData = {
  userId: string
  dailyConsumptionInMl: number
  todayTotalConsumptionInMl?: number
}

export type WaterConsumptionData = {
  goalDailyConsumptionInMl: number
  todayConsumptionInMl: number
}

export type RegisterWaterConsumptionData = {
  userId: string
  amountConsumedInMl: number
  consumptionDate: Date
}

export type GetTotalWaterConsumptionData = {
  userId: string
  date: Date
}

export type GetTotalWaterConsumptionReturnData = {
  todayTotalConsumptionInMl: number
}
