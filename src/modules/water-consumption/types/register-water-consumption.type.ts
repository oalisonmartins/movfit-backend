export type RegisterWaterConsumptionRequest = {
  amountConsumedInMl: number
}

export type RegisterWaterConsumptionInput = {
  dailyWaterConsumptionId: string
  dateOfConsumption: Date
  amountConsumedInMl: number
}
